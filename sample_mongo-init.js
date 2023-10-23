db.createUser(
    {
        user: "REPLACE THE VALUE OF MONGODB_USERNAME",
        pwd: "REPLACE THE VALUE OF MONGODB_PASSWORD",
        roles: [
            {
                role: "readWrite",
                db: "MedDict"
            }
        ]
    }
);

db.createCollection("dictionary"); //MongoDB creates the database when you first store data in that database