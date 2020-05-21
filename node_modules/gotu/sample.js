var user = entity('User', {

    username: field(String, {
        presence: true,
        exclusion: {
            within: ["nicklas"],
            message: "'%{value}' is not allowed"
        }
    }),

    password: field(String, {
        presence: true,
        length: {
            minimum: 6,
            message: "must be at least 6 characters"
        }
    }),

    email: field(String, {
        presence: true,
        length: {
            minimum: 6,
            message: "must be at least 6 characters"
        }
    }),

    lastAccess: field(Date)

});

validate({ password: "bad" }, constraints);