// Create router
const express = require("express")
const router = express.Router()


router.get('/browse', (req, res, next) => {
    const cart = req.session.cart || [];
    let sort = req.query.sort || "name-asc";  
    let orderBy = "";
    switch (sort) {
        case "name-asc":
            orderBy = "ORDER BY SUBSTRING(vitamin, 9) ASC";

            break;
        case "name-desc":
            orderBy = "ORDER BY SUBSTRING(vitamin, 9) DESC";

            break;
        case "price-asc":
            orderBy = "ORDER BY price ASC";
            break;
        case "price-desc":
            orderBy = "ORDER BY price DESC";
            break;
        default:
            orderBy = "ORDER BY vitamin ASC";
    }

    const sqlquery = `SELECT * FROM vitamins ${orderBy}`;

    db.query(sqlquery, (err, results) => {
        if (err) return next(err);

        res.render("browse.ejs", {
            availableVitamins: results,
            sort: sort,
            cart: cart
        });
    });
});


module.exports = router
