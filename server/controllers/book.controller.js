import Book from "../models/Book.js";
import formidable from "formidable";
import fs from "fs";
import extend from "lodash/extend.js";

export const create = (req, res) => {
    let form = formidable({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(400).json({ error: "Image upload failed" });

        
        Object.keys(fields).forEach((key) => {
            if (Array.isArray(fields[key])) {
                fields[key] = fields[key][0];
            }
        });

        let book = new Book(fields);
        book.owner = req.auth._id;

        if (files.image && files.image.filepath) {
            book.image.data = fs.readFileSync(files.image.filepath);
            book.image.contentType = files.image.mimetype;
        }

        try {
            let result = await book.save();
            result.image = undefined;
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
};

export const list = async (req, res) => {
    try {
        const books = await Book.find()
            .select("-image")
            .populate("owner", "_id name")
            .populate("checkedOutBy", "_id name");
        res.json(books);
    } catch (err) {
        res.status(400).json({ error: "Could not list books" });
    }
};

export const bookByID = async (req, res, next, id) => {
    try {
        let book = await Book.findById(id)
            .populate("owner", "_id name")
            .populate("checkedOutBy", "_id name");
        if (!book) return res.status(404).json({ error: "Book not found" });
        req.book = book;
        next();
    } catch (err) {
        return res.status(400).json({ error: "Could not retrieve book" });
    }
};

export const read = (req, res) => {
    let b = req.book.toObject();
    delete b.image;
    res.json(b);
};

export const photo = (req, res) => {
    if (req.book.image && req.book.image.data) {
        res.set("Content-Type", req.book.image.contentType);
        return res.send(req.book.image.data);
    }
    res.status(404).end();
};

export const update = (req, res) => {
    let form = formidable({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(400).json({ error: "Image upload failed" });

        
        Object.keys(fields).forEach((key) => {
            if (Array.isArray(fields[key])) {
                fields[key] = fields[key][0];
            }
        });

        let book = req.book;
        if (book.owner._id.toString() !== req.auth._id) {
            return res.status(403).json({ error: "Not authorized" });
        }

        book = extend(book, fields);
        book.updated = Date.now();

        if (files.image && files.image.filepath) {
            book.image.data = fs.readFileSync(files.image.filepath);
            book.image.contentType = files.image.mimetype;
        }

        try {
            let result = await book.save();
            result.image = undefined;
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });
};

export const remove = async (req, res) => {
    if (req.book.owner._id.toString() !== req.auth._id) {
        return res.status(403).json({ error: "Not authorized" });
    }
    try {
        await Book.deleteOne({ _id: req.book._id });
        res.json({ message: "Book deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const checkout = async (req, res) => {
    const userId = req.auth._id;
    const book = req.book;

    if (book.status === "checked-out") {
        return res.status(400).json({ error: "Book already checked out" });
    }

    if (book.owner._id.toString() === userId) {
        return res.status(400).json({ error: "Owner cannot check out their own book" });
    }

    book.status = "checked-out";
    book.checkedOutBy = userId;
    await book.save();
    res.json({ message: "Book checked out" });
};

export const returnBook = async (req, res) => {
    const userId = req.auth._id;
    const book = req.book;

    if (book.status !== "checked-out" || !book.checkedOutBy) {
        return res.status(400).json({ error: "Book is not currently checked out" });
    }

    if (book.checkedOutBy._id.toString() !== userId) {
        return res.status(403).json({ error: "You did not check out this book" });
    }

    book.status = "available";
    book.checkedOutBy = null;
    await book.save();
    res.json({ message: "Book returned" });
};
