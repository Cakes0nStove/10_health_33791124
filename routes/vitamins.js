// Create router
const express = require("express")
const router = express.Router()

// Search page
router.get('/search', (req, res) => {
    res.render("search.ejs")
});

// Search results
router.get('/search-result', (req, res, next) => {
    const keyword = req.query.search_text
    const sqlquery = "SELECT * FROM vitamins WHERE vitamin LIKE ?"
    const searchTerm = `%${keyword}%`

    db.query(sqlquery, [searchTerm], (err, result) => {
        if (err) return next(err)

        res.render("search.ejs", {
            shopData: { shopName: "vitacore" },
            keyword,
            vitamins: result
        })
    })
});
// Add a vitamin
router.get('/add',function(req, res, next){
    res.render('addvitamin.ejs')
});

router.post('/vitaminadded', (req, res, next) => {
    console.log("BODY RECEIVED:", req.body);
    const sqlquery = "INSERT INTO vitamins (vitamin, price, description) VALUES (?, ?, ?)";

    const newrecord = [req.sanitize(req.body.vitamin),
                       req.sanitize(req.body.price),
                       req.sanitize(req.body.description)];

    db.query(sqlquery, newrecord, (err) => {
        if (err) return next(err)
        res.send(`Vitamin added: ${req.body.vitamin}, Price: ${req.body.price}, Description: ${req.body.description}`);
    })
});

router.get('/survey', (req, res) => {
    res.render("survey.ejs")
});

router.post('/survey-results', (req, res) => {
    const { energy, immunity, mood, stress,sleep } = req.body;

    // vitamin scores
    let vitamins = {
        "Vitamin C": 0,
        "Vitamin D": 0,
        "Vitamin B12": 0,
        "Iron": 0,
        "Magnesium": 0
    };

    // Stress Scoring
    if (stress === "high") {
        vitamins["Magnesium"] += 3;    
        vitamins["Vitamin B12"] += 1;  
    }
    else if (stress === "medium") {
        vitamins["Magnesium"] += 1;
}

// Sleep Scoring
    if (sleep === "poor") {
        vitamins["Magnesium"] += 3;    
        vitamins["Vitamin D"] += 1;    
    }
    else if (sleep === "average") {
        vitamins["Magnesium"] += 1;
    }

    // Energy Scoring
    if (energy === "low") {
        vitamins["Vitamin B12"] += 2;
        vitamins["Iron"] +=31;
    } 
    else if (energy === "medium") {
        vitamins["Vitamin B12"] += 1;
    }

    // Immunity Scoring
    if (immunity === "often") {
        vitamins["Vitamin C"] += 3;
        vitamins["Vitamin D"] += 1;
    }
    else if (immunity === "sometimes") {
        vitamins["Vitamin C"] += 1;
    }

    // Mood Scoring
    if (mood === "low") {
        vitamins["Vitamin D"] += 3;
        vitamins["Magnesium"] += 2;
    }
    else if (mood === "ok") {
        vitamins["Magnesium"] += 1;
    }

    // Determine top vitamin
    const bestVitamin = Object.entries(vitamins)
        .sort((a, b) => b[1] - a[1])[0]; // [name, score]

    const vitaminName = bestVitamin[0];
    const vitaminScore = bestVitamin[1];

    res.render("results.ejs", { vitaminName, vitaminScore, vitamins });
});

// Export router
module.exports = router
