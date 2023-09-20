const { Schema, model } = require("mongoose");
const {handleMongooseError} = require("../helpers")
const Joi = require('joi');

const emailRegexp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

const userSchema = new Schema (
    {
        password: {
          type: String,
          minlength: 6,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          match: emailRegexp,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
      }, { versionKey: false, timestamps: true }
);

userSchema.post("save",handleMongooseError)

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });
  
 
  
  const User = model("user", userSchema);

  const schemas = {
    registerSchema,
    loginSchema,
  }
  
  module.exports = {
    User,
    schemas,
    };