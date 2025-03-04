import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React, { useEffect, useState } from "react";
import "./addproduct.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import {
  addImageToProduct,
  addProduct,
  editProduct,
  getAllProduct,
  resetEditableProduct,
} from "../../../store/product/productSlice";
// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategoriesByType,
  setCategoryType,
} from "../../../store/category/categorySlice";
import { getAllSubCategories } from "../../../store/supCategories/supcategoriesSlice";
import { getAllBrand } from "../../../store/brand/brand.slice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { file } from "fontawesome";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function AddProduct() {
  const { categories, categoryType } = useSelector(
    (state) => state.categorySlice
  );
  const { subCategories } = useSelector((state) => state.subCategorySlice);
  const { brands } = useSelector((state) => state.brandSlice);
  const { editableProduct } = useSelector((state) => state.productSlice);

  const [selectedCategoryId, setSelectedCategoryId] = useState();

  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      subCategory: searchParams.get("subCategory_id") || "",
      brand: "",
      description: "",
      offer: "",
      images: [],
      unitPrice: 0,
      basePrice: 0,
      stockAmount: 0,
      creditDiscount: 0,
      cashDiscount: 0,
      madeIn: "",
      productionDate: "",
      expireDate: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      (editableProduct
        ? dispatch(editProduct(values))
        : dispatch(addProduct(values))
      ).then((res) => {
        console.log(res);
        toast(`Product ${editableProduct ? "Updated" : "Added"} Successfully`);

        if (files.length) {
          const data = new FormData();
          data.set("image", files[0]?.file);

          dispatch(
            addImageToProduct({
              id: res.payload._id || editableProduct._id,
              data,
            })
          ).then(() => navigate("/products"));
        } else {
          dispatch(resetEditableProduct(null));
          navigate("/products");
        }
      });
    },
  });

  useEffect(() => {
    if (!editableProduct) formik.handleReset();
    else {
      formik.setFieldValue("name", editableProduct?.name);
      formik.setFieldValue("id", editableProduct?._id);
      formik.setFieldValue("unitPrice", editableProduct?.unitPrice);
      formik.setFieldValue("basePrice", editableProduct?.basePrice);
      formik.setFieldValue("cashDiscount", editableProduct?.cashDiscount);
      formik.setFieldValue("creditDiscount", editableProduct?.creditDiscount);
      formik.setFieldValue("stockAmount", editableProduct?.stockAmount);
      formik.setFieldValue("madeIn", editableProduct?.madeIn);
      formik.setFieldValue("offer", editableProduct?.offer);
      formik.setFieldValue("description", editableProduct?.description);
      console.log("productionDate", editableProduct?.productionDate);
      formik.setFieldValue("productionDate", editableProduct?.productionDate);
      // formik.setFieldValue("supCategory", editableProduct?.supCategory.name);
      formik.setFieldValue("brand", editableProduct?.brand?.id);
    }
  }, [editableProduct]);

  useEffect(() => {
    dispatch(getAllCategoriesByType(categoryType));
  }, [categoryType]);

  useEffect(() => {
    dispatch(
      getAllSubCategories(selectedCategoryId || searchParams.get("category_id"))
    );
  }, [selectedCategoryId]);

  useEffect(() => {
    dispatch(getAllBrand());
  }, []);

  return (
    <div className="AddProduct-container">
      <h2>
        <span>{editableProduct ? "Edit" : "Add"} New Product </span>
        {editableProduct ? (
          <AddCircleOutlineIcon
            onClick={() => dispatch(resetEditableProduct(null))}
            fontSize="large"
          />
        ) : (
          ""
        )}
      </h2>

      <div className="form-container">
        <form
          onSubmit={formik.handleSubmit}
          style={{ alignItems: "flex-start" }}
          enctype="multipart/form-data"
        >
          <div
            className="product-info"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              flexGrow: 1,
            }}
          >
            {/* ----------------------- */}
            <TextField
              margin="normal"
              fullWidth
              required
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            {/* ----------------------- */}
            <FormControl fullWidth>
              <InputLabel id="CategoryType-label">Category Type</InputLabel>
              <Select
                labelId="CategoryType-label"
                id="CategoryType"
                label="Category Type"
                name="CategoryType"
                value={categoryType || searchParams.get("category_type")}
                onChange={(e) => dispatch(setCategoryType(e.target.value))}
              >
                <MenuItem value={"product"}>product</MenuItem>
                <MenuItem value={"medicine"}>medicine</MenuItem>
                <MenuItem value={"accessories"}>accessories</MenuItem>
              </Select>
            </FormControl>

            {/* ----------------------- */}
            <FormControl fullWidth>
              <InputLabel id="category-label">category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                label="Category"
                name="category"
                value={selectedCategoryId || searchParams.get("category_id")}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem value={`${cat?._id}`}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* ----------------------- */}
            <FormControl fullWidth>
              <InputLabel id="subCategory-label">Sub Category</InputLabel>
              <Select
                labelId="subCategory-label"
                id="subCategory"
                required
                label="Sub Category"
                name="subCategory"
                value={formik.values.subCategory}
                onChange={formik.handleChange}
                error={
                  formik.touched.subCategory &&
                  Boolean(formik.errors.subCategory)
                }
                helperText={
                  formik.touched.subCategory && formik.errors.subCategory
                }
              >
                {subCategories.map((sub) => (
                  <MenuItem value={`${sub?._id}`}>{sub.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* ----------------------- */}
            <FormControl fullWidth>
              <InputLabel id="brand-label">Brand</InputLabel>
              <Select
                labelId="brand-label"
                required
                id="brand"
                label="Brand"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
              >
                {brands?.map((brand) => (
                  <MenuItem value={`${brand?._id}`}>{brand.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* ----------------------- */}
            <TextField
              margin="normal"
              fullWidth
              id="offer"
              label="offer"
              name="offer"
              value={formik.values.offer}
              onChange={formik.handleChange}
              error={formik.touched.offer && Boolean(formik.errors.offer)}
              helperText={formik.touched.offer && formik.errors.offer}
            />
            {/* ----------------------- */}
            <TextareaAutosize
              aria-label="description"
              placeholder="description"
              id="description"
              name="description"
              minRows={8}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              style={{
                width: "100%",
                outline: "none",
                overflow: "hidden",
                padding: "8px",
                borderRadius: "8px",
                resize: "none",
                border: "1px solid gray",
                height: "100px",
                overflowY: "auto",
              }}
            />

            <Button type="submit">save</Button>
          </div>

          <div
            className="prduct-price"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flexGrow: 1,
            }}
          >
            {/* ----------------------- */}
            <TextField
              margin="normal"
              fullWidth
              required
              id="unitPrice"
              label="unit price"
              name="unitPrice"
              value={formik.values.unitPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.unitPrice && Boolean(formik.errors.unitPrice)
              }
              helperText={formik.touched.unitPrice && formik.errors.unitPrice}
            />

            {/* ----------------------- */}
            <TextField
              margin="normal"
              fullWidth
              id="basePrice"
              label="base price"
              name="basePrice"
              value={formik.values.basePrice}
              onChange={formik.handleChange}
              error={
                formik.touched.basePrice && Boolean(formik.errors.basePrice)
              }
              helperText={formik.touched.basePrice && formik.errors.basePrice}
            />
            {/* ----------------------- */}
            <TextField
              margin="normal"
              fullWidth
              required
              id="stockAmount"
              label="stock Amount"
              name="stockAmount"
              value={formik.values.stockAmount}
              onChange={formik.handleChange}
              error={
                formik.touched.stockAmount && Boolean(formik.errors.stockAmount)
              }
              helperText={
                formik.touched.stockAmount && formik.errors.stockAmount
              }
            />

            {/* ----------------------- */}
            <TextField
              margin="normal"
              fullWidth
              id="creditDiscount"
              label="credit Discount"
              name="creditDiscount"
              value={formik.values.creditDiscount}
              onChange={formik.handleChange}
              error={
                formik.touched.creditDiscount &&
                Boolean(formik.errors.creditDiscount)
              }
              helperText={
                formik.touched.creditDiscount && formik.errors.creditDiscount
              }
            />
            {/* ----------------------- */}
            <TextField
              margin="normal"
              fullWidth
              id="cashDiscount"
              label="cash Discount"
              name="cashDiscount"
              value={formik.values.cashDiscount}
              onChange={formik.handleChange}
              error={
                formik.touched.cashDiscount &&
                Boolean(formik.errors.cashDiscount)
              }
              helperText={
                formik.touched.cashDiscount && formik.errors.cashDiscount
              }
            />
            {/* ----------------------- */}
            <TextField
              margin="normal"
              fullWidth
              id="madeIn"
              label="made In"
              name="madeIn"
              value={formik.values.madeIn}
              onChange={formik.handleChange}
              error={formik.touched.madeIn && Boolean(formik.errors.madeIn)}
              helperText={formik.touched.madeIn && formik.errors.madeIn}
            />
            {/* ----------------------- */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Production Date"
                name="productionDate"
                value={formik.values.productionDate}
                onChange={(value) =>
                  formik.setFieldValue("productionDate", value)
                }
                renderInput={(params) => (
                  <TextField name="productionDate" {...params} />
                )}
              />
            </LocalizationProvider>
            {/* ----------------------- */}
            {/* <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              label="expire Date"
              inputFormat="MM/dd/yyyy"
              value={formik.values.expireDate}
              onChange={formik.handleChange}
              error={
                formik.touched.expireDate && Boolean(formik.errors.expireDate)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}

            {/* ----------------------- */}
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={1}
              name="files"
              labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
