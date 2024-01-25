import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Grid,
  FormControl,
  TextField,
  MenuItem,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import moment from "moment";
import _ from "underscore";

import FileViewPopup from "../../FileViewPopup";

import validatorRules from "../../../helper/customValidatorRules";
import { readFileAsyncUint8 } from "../../../helper/fileReader";
import useSimpleReactValidator from "../../../helper/useSimpleReactValidator";

import { formUseStyles } from "../../../Theme";

import { updateCompanyType } from "../../../store/actions/BusinessManagement/ManageBusinesses/KYC/action_CommonKYC";
import {
  getCompanyTypes,
  getCategories,
  getSubCategories,
} from "../../../store/actions/BusinessManagement/ManageBusinesses/action_BusinessInformation";

function CompanyType(props) {
  const classes = formUseStyles();

  const [values, setValues] = useState({
    type: "",
    category: "",
    subCategory: "",
  });

  const [validator, forceUpdate] = useSimpleReactValidator({
    autoForceUpdate: true,
    validators: { ...validatorRules },
  });

  useEffect(() => {
    props.getCompanyTypes();
    props.getCategories();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(values.category)) {
      props.getSubCategories(values.category);
    }
  }, [values.category]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (validator.allValid()) {
      var data = {
        Crid: props.Crid,
        CompanyTypeId: values.type,
        CategoryId: values.category,
        SubCategoryId: values.subCategory,
        IsContact: props.IsContact,
        ClientId: props.ClientId,
      };
      props.updateCompanyType(data);
      props.redirect(true);
    } else {
      validator.showMessages();
      forceUpdate();
    }
  };

  useEffect(() => {
    setValues({
      type: props.CompanyTypeId,
      category: props.CategoryId,
      subCategory: props.SubCategoryId,
    });
  }, [props.CompanyTypeId, props.CategoryId, props.SubCategoryId]);

  return (
    <>
      <div className={classes.FormPanel}>
        <FileViewPopup />
        <Grid container item lg={6} md={6} xs={12} spacing={3}>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                id="type"
                name="type"
                label="Type of Company"
                required
                select
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.type}
                onChange={handleChange}
                onBlur={() => {
                  validator.showMessageFor("type");
                }}
                helperText={validator.message("type", values.type, "required")}
              >
                {!_.isEmpty(props.companyTypes) ? (
                  props.companyTypes.map((company, index) => {
                    return (
                      <MenuItem key={index} value={company.CompanyTypeId}>
                        {company.CompanyType}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem disabled>No options</MenuItem>
                )}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                id="category"
                name="category"
                label="Category"
                required
                select
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.category}
                onChange={handleChange}
                onBlur={() => {
                  validator.showMessageFor("category");
                }}
                helperText={validator.message(
                  "category",
                  values.category,
                  "required"
                )}
              >
                {!_.isEmpty(props.categories) ? (
                  props.categories.map((category, index) => {
                    return (
                      <MenuItem key={index} value={category.CategoryID}>
                        {category.CategoryName}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem disabled>No options</MenuItem>
                )}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                id="subCategory"
                name="subCategory"
                label="Select Sub Category"
                required
                select
                color="secondary"
                margin="normal"
                variant="outlined"
                size="normal"
                value={values.subCategory}
                onChange={handleChange}
                onBlur={() => {
                  validator.showMessageFor("subCategory");
                }}
                helperText={validator.message(
                  "subCategory",
                  values.subCategory,
                  "required"
                )}
              >
                {values.type &&
                values.category &&
                !_.isEmpty(props.subCategories) ? (
                  props.subCategories.map((subCategory, index) => {
                    return (
                      <MenuItem key={index} value={subCategory.SubCategoryID}>
                        {subCategory.SubCategoryName}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem disabled>No options</MenuItem>
                )}
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      {props.KycStatus !== 7 && props.BusinessData?.Status !== "Approved" ? (
        <Stack spacing={3} sx={{ paddingBottom: "36px" }}>
          <Divider className={classes.Divider} />
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              Next
            </Button>
            <Link
              to={
                props.fromPage === "AddContact"
                  ? "/App/ManageContacts"
                  : "/App/ManageBusiness"
              }
            >
              <Button color="error">Cancel</Button>
            </Link>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
}

CompanyType.propTypes = {};

const mapStateToProps = (state) => ({
  companyTypes: state.businessInformation.companyTypes,
  categories: state.businessInformation.categories,
  subCategories: state.businessInformation.subCategories,
  IsContact: state.businessKYC.IsContact,
  CompanyTypeId: state.businessKYC.CompanyTypeId,
  CategoryId: state.businessKYC.CategoryId,
  SubCategoryId: state.businessKYC.SubCategoryId,
  BusinessData: state.businessKYC.BusinessProof,
  ClientId: state.businessKYC.ClientId,
});

export default connect(mapStateToProps, {
  getCompanyTypes,
  getCategories,
  getSubCategories,
  updateCompanyType,
})(CompanyType);
