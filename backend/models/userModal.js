import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// mongoose.model(): Это функция, которая создает и компилирует модель на основе заданной схемы. Функция принимает два аргумента:

// Первый аргумент ("User"): строка, которая представляет название модели. Это имя будет использоваться для работы с моделью в коде, и оно также определяет имя коллекции в MongoDB (Mongoose автоматически преобразует его в нижний регистр и во множественное число, создавая коллекцию users).

// Второй аргумент (userSchema): это схема, определяющая структуру документов для этой модели. Схема описывает поля, которые будут в документах, типы данных, и может включать методы, валидации, и настройки индексов.
