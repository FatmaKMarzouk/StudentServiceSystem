import React, { Component } from "react";
import "./footer.css";
import LanguageIcon from "@material-ui/icons/Language";
import FacebookIcon from "@material-ui/icons/Facebook";
import Link from "@material-ui/core/Link";
import PhoneIcon from "@material-ui/icons/Phone";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer id="footer">
        <div style={{ flex: "20%" }}>
          <div id="footer-links-container">
            <LanguageIcon id="footer-icons" />
            <Link
              id="footer-links"
              href="https://www.alexu.edu.eg/index.php/en/"
              target="_blank"
            >
              Alexandria University - Offical Website
            </Link>
          </div>
          <div id="footer-links-container">
            <PhoneIcon id="footer-icons" />
            <span id="footer-links">03 5920031</span>
          </div>
        </div>
        <div style={{ flex: "25%" }}>
          <div id="footer-links-container">
            <FacebookIcon id="footer-icons" />
            <Link
              id="footer-links"
              href="https://www.facebook.com/AlexandriauniOfficial/"
              target="_blank"
            >
              جامعة الإسكندرية - الصفحة الرسمية
            </Link>
          </div>
          <div id="footer-links-container">
            <LinkedInIcon id="footer-icons" />
            <Link
              id="footer-links"
              href="https://www.linkedin.com/school/alexandria-university/"
              target="_blank"
            >
              Alexandria University - LinkedIn
            </Link>
          </div>
        </div>
        <div>
          <img
            src="uni_name.png"
            alt="alexuni-logo"
            style={{ height: "100px" }}
          />
        </div>
      </footer>
    );
  }
}

export default Footer;
