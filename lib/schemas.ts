import * as yup from "yup";

const email = yup.string().trim().required("Email is required").email("Enter a valid email");
const text = (label: string) => yup.string().trim().required(`${label} is required`);
const select = (label: string) => yup.string().required(`Select a ${label}`);
const num = (label: string) =>
  yup.number().typeError(`${label} must be a number`).min(0, `${label} cannot be negative`).required();

export const loginSchema = yup.object({
  email,
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
  name: text("Name"),
  email,
  password: yup.string().required("Password is required").min(8, "At least 8 characters"),
  confirm: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const forgotSchema = yup.object({ email });

export const itemSchema = yup.object({
  sapPn: text("SAP PN"),
  starkeyPn: text("Starkey PN"),
  itemName: text("Item name"),
  mould: text("Mould"),
  equipment: text("Equipment"),
  material: text("Material"),
  rm: text("RM"),
});

export const materialSchema = yup.object({
  name: text("Name"),
  code: text("Code"),
  category: select("category"),
  unit: select("unit"),
  stock: num("Stock"),
  unitPrice: num("Cost"),
  supplier: text("Supplier"),
  description: yup.string().default(""),
});
