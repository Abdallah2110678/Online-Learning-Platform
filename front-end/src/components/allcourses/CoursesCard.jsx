import React, { useContext } from "react";
import "./courses.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { REST_API_BASE_URL } from "./../../App";
import axios from "axios";
import { Store } from "../../store";
import { useNavigate } from "react-router-dom";

const CoursesCard = ({ courses }) => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  console.log(userInfo);

  const addCourseToCart = async (courseId) => {
    if (!userInfo) {
      alert("Please login to add course to cart");
      navigate("/login");
    } else if (userInfo.role != "STUDENT") {
      alert("Student only can Add to cart");
      return;
    } else {
      try {
        const response = await axios.post(
          `${REST_API_BASE_URL}/student/cart/addcourse/${userInfo.id}/${courseId}`
        );
        alert(response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        } else {
          console.error("An error occurred:", error.message);
        }
      }
    }
  };

  return (
    <>
      <section className="coursesCard">
        <div className="container grid2">
          {courses.length != 0 ? (
            courses.map((course) => (
              <div className="items">
                <div className="content flex">
                  <div className="left">
                    <div className="img">
                      {/* picture of course */}
                      <img src={""} alt="" />
                    </div>
                  </div>
                  <div className="text">
                    <h1>{course.title}</h1>
                    <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <label htmlFor="">(5.0)</label>
                    </div>
                    <div className="details">
                      <>
                        {" "}
                        {course.user ? (
                          <div className="box">
                            <div className="dimg">
                              {/* display user image here */}
                              <img src={""} alt="" />
                            </div>
                            <div className="para">
                              <h4>By {course.user.fname}</h4>
                            </div>
                          </div>
                        ) : (
                          <div className="box">
                            <div className="dimg">
                              {/* display user image here */}
                              <img src={""} alt="" />
                            </div>
                            <div className="para">
                              <h4>By Admin</h4>
                            </div>
                          </div>
                        )}
                        {course.courseMaterials.length ? (
                          <span>({course.courseMaterials.length}) Video</span>
                        ) : (
                          <span>
                            ({course.courseMaterials.length}) Videos Not Found
                          </span>
                        )}
                      </>
                    </div>
                  </div>
                </div>
                <div className="price">
                  {course.price ? (
                    <h3>$ {course.price} All Course</h3>
                  ) : (
                    <h3>Free Course</h3>
                  )}
                </div>
                <button
                  className="outline-btn"
                  style={{ marginBottom: "5px" }}
                  onClick={() => addCourseToCart(course.id)}
                >
                  Add To Cart{" "}
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </button>

                <button className="outline-btn">ENROLL NOW !</button>
              </div>
            ))
          ) : (
            <div className="container d-flex justify-content-center mt-5">
            <h3 >
              No Courses Found
            </h3></div>
          )}
        </div>
      </section>
    </>
  );
};

export default CoursesCard;
