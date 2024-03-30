

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../ASSETS/Images/1.png';
import img2 from '../../ASSETS/Images/2.png';
import img3 from '../../ASSETS/Images/3.png';
import img4 from '../../ASSETS/Images/4.png';
import './CategorySidebar.css';
import { useState } from 'react';
import noimage from '../../ASSETS/noimage.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Grid, Paper, Typography, Button } from '@mui/material';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const CategorySidebar = ({ categories }) => {
    // const noimage = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'

    // console.log(categories)

    categories = [
        {
            category: {
                "Code": "all",
                "Name": "All Products",
                "CategoryImageFilePath": noimage,
             "Categoryshorturl":"all",
                "subcategories": []
            }
        },
        ...categories
    ]  


    const [hoveredAccordion, setHoveredAccordion] = useState(null);
    const [showsubcategory, setshowsubcategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    const handleMouseEnterHeader = (index, categoryCode) => {
      setHoveredAccordion(index);
  
      if (showsubcategory === categoryCode) {
        setshowsubcategory(null);
        setSelectedCategory(null);
      }
    };
  
    const handleMouseEnterBody = (index) => {
      setHoveredAccordion(index);
    };
  
    const handleMouseLeave = () => {
      setHoveredAccordion(null);
    };

    const handleCategoryClick  = (category) => {
        window.location(`/Home/${category}/all`)
    }


    return (
        <div className='categorysidebar'>
          <h2>Categories</h2>
          <div className='categorysidebarin'>
          <div class="accordion" id="accordionExample">
              {categories && categories.length > 0 && categories.map((item, index) => (
                <div class={`accordion-item ${!item.subcategories || item.subcategories.length === 0 ? '' : 'no-subcategories'}`} key={index}>
                  <h2 class="accordion-header p-0" id={`heading${index}`}>
                    <Link to={`/Home/${item.category.Categoryshorturl}/all/list`} style={{ textDecoration: 'none', color: 'black' }}>
                      <button class="accordion-button collapsed pt-1 pb-1 pl-2 pr-2 " 
                        type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                        <Grid container direction='row'>
                          <Grid item md={4}>
                            <img src={item.category.IconImageFilePath || noimage} alt="e" width='60' height='60' />
                          </Grid>
                          <Grid className="cta-names" item md={8} sx={{ display: 'flex', alignItems: 'center' }} onclick={(e) => {handleCategoryClick(item.category.Categoryshorturl)}}>
                              <Typography className="catName">{item.category.Name}</Typography>
                          </Grid>
                        </Grid>
                      </button>
                    </Link>
                  </h2>
                  {item.subcategories && item.subcategories.length > 0 && (
                    <div id={`collapse${index}`} class="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <div class="accordion" id="subaccordionExample">
                          {item.subcategories.map((subcategory, subIndex) => (
                            <div class={`accordion-item ${!subcategory.SubCategoriesLevel2Detail || subcategory.SubCategoriesLevel2Detail.length === 0 ? '' : 'no-subcategories'}`} key={subcategory.Code}>
                              <h2 class="accordion-header p-0" id={`subheading${subIndex}`}>
                                <Link to={`/Home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}/list`} style={{ textDecoration: 'none', color: 'black' }}>
                                  <button class="accordion-button collapsed pt-1 pb-1 pl-2 pr-2" type="button" data-bs-toggle="collapse" data-bs-target={`#subcollapse${subcategory.Code}`} aria-expanded="false" aria-controls={`subcollapse${subIndex}`}>
                                    <Grid container direction='row'>
                                      <Grid item md={3}>
                                        <img src={subcategory.IconImageFilePath || noimage} alt="logo" width='50' height='50' />
                                      </Grid>
                                      <Grid item md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                          {subcategory.Name}
                                      </Grid>
                                    </Grid>
                                  </button>
                                </Link>
                              </h2>
                              {subcategory.SubCategoriesLevel2Detail && subcategory.SubCategoriesLevel2Detail.length > 0 && (
                                <div key={subcategory.Code} id={`subcollapse${subcategory.Code}`} class="accordion-collapse collapse" aria-labelledby={`subheading${subcategory.Code}`} data-bs-parent="#subaccordionExample">
                                  <div class="accordion-body">
                                    <ul style={{ listStyleType: 'none', margin: '0' }}>
                                    {subcategory.SubCategoriesLevel2Detail.map((level2, l3Index) => (
                                      <Link to={`/Home/${item.category.Categoryshorturl}/${subcategory.Subcatgeoryshorturl}/${level2.SubCatgeoryL2shorturl}`} style={{ textDecoration: 'none', color: 'black' }}>
                                      <Grid container direction='row' sx={{cursor:'pointer'}}>
                                        <Grid item md={3}>
                                          <img src={level2.SubL2IconImageFilePath || noimage} alt="logo" width='50' height='50' />
                                        </Grid>
                                        <Grid item md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                            {level2.Name}
                                        </Grid>
                                      </Grid>
                                      </Link>
                                    ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}


          </div>

            
          </div>
        </div>
      );
    };
    

export default CategorySidebar;


