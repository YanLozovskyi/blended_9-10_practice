const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    const db = await connect(process.env.DB_STRING);
    console.log(
      `DB is connected. name: ${db.connection.name}. host: ${db.connection.host}. port: ${db.connection.port}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDb;

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
