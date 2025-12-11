# Insert data into the tables

USE health;


INSERT INTO users (username, first_name, last_name, email, hashed_password)
VALUES (
    'gold',
    'Gold',
    'Smith',
    'gold@gold.ac.uk',
    '$2b$10$rECN1nodOn1M3C79JyybIumYMRHTm5LtxEvnfzR/Pf70svZYsI6cG'
);

INSERT INTO vitamins (vitamin, price)
VALUES (
    'Vitamin C',
    '5.50'
);