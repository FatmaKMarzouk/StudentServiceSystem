import React, { useState } from "react";
import "./items-carousel.css";
import ItemsCarousel from "react-items-carousel";
import DialogBox from "../dialog/DialogBox";
import DialogSelect from "../dialog/DialogSelect";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 10;
  return (
    <div className="test-div" style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        infiniteLoop
        gutter={10}
        numberOfCards={4}
        slidesToScroll={4}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={setActiveItemIndex}
        rightChevron={
          <Button id="items-carousel-button">
            <ChevronRightIcon />
          </Button>
        }
        leftChevron={
          <Button id="items-carousel-button">
            <ChevronLeftIcon />
          </Button>
        }
        chevronWidth={chevronWidth}
      >
        <Paper id="items-carousel-container">
          <div id="items-carousel">
            <div id="paper-icons">١</div>

            <span id="items-carousel-1-title">شهادة قيد</span>
            <div id="rules">
              <span style={{ marginBottom: "2%", fontSize: "16px" }}>
                : الشروط
              </span>
              <span style={{ marginBottom: "1%" }}>١- دفع مصاريف عام</span>
              <span style={{ marginBottom: "1%" }}>
                ٢- تأجيل التجنيد العسكري
              </span>
              <span id="rules-exception">
                ( في حالة وجود تأمين لا داعي للدفع )
              </span>
            </div>
            <div id="service-icon">
              <img
                style={{ height: "55px" }}
                src="enrollment.png"
                id="service-icon-image"
                alt="service-icon"
              ></img>
            </div>
            <DialogBox id={1} />
          </div>
        </Paper>
        <Paper id="items-carousel-container">
          <div id="items-carousel">
            <div id="paper-icons">٢</div>
            <span id="items-carousel-1-title">اختيار البرنامج</span>
            <div id="rules">
              <span style={{ marginBottom: "2%", fontSize: "16px" }}>
                : الشروط
              </span>
              <span style={{ marginBottom: "1%" }}>
                ١- اجتياز المرحلة الإعدادية
              </span>
              <span style={{ marginBottom: "1%" }}>
                ٢- الحصول على الحد الأدنى للمعدل
              </span>
              <span style={{ marginBottom: "1%" }}>
                التراكمي للقسم المرغوب الالتحاق به
              </span>
            </div>
            <div id="service-icon">
              <img
                src="chooseprog.png"
                id="service-icon-image"
                alt="service-icon"
              ></img>
            </div>
            <DialogSelect />
          </div>
        </Paper>
        <Paper id="items-carousel-container">
          <div id="items-carousel">
            <div id="paper-icons">٣</div>
            <span id="items-carousel-1-title">ترانسكريبت المواد</span>
            <div id="rules">
              <span style={{ marginBottom: "2%", fontSize: "16px" }}>
                : الشروط
              </span>
              <span style={{ marginBottom: "1%" }}>١- دفع مصاريف عام</span>
            </div>
            <div id="service-icon">
              <img
                src="transcript.png"
                id="service-icon-image"
                alt="service-icon"
              ></img>
            </div>
            <DialogBox id={2} />
          </div>
        </Paper>
        <Paper id="items-carousel-container">
          <div id="items-carousel">
            <div id="paper-icons">٤</div>
            <span id="items-carousel-1-title">الكارنية الجامعي</span>
            <div id="rules">
              <span style={{ marginBottom: "2%", fontSize: "16px" }}>
                : الشروط
              </span>
              <span style={{ marginBottom: "1%" }}>١- دفع مصاريف عام</span>
            </div>
            <div id="service-icon">
              <img
                src="studentcard.png"
                id="service-icon-image"
                alt="service-icon"
              ></img>
            </div>
            <DialogBox id={3} />
          </div>
        </Paper>
        <Paper id="items-carousel">
          <div id="paper-icons">٥</div>
        </Paper>
        <Paper id="items-carousel">
          <div id="paper-icons">٦</div>
        </Paper>
        <Paper id="items-carousel">
          <div id="paper-icons">٧</div>
        </Paper>
        <Paper id="items-carousel">
          <div id="paper-icons">٨</div>
        </Paper>
        <Paper id="items-carousel">
          <div id="paper-icons">٩</div>
        </Paper>
        <Paper id="items-carousel">
          <div id="paper-icons">١٠</div>
        </Paper>
        <Paper id="items-carousel">
          <div id="paper-icons">١١</div>
        </Paper>
      </ItemsCarousel>
    </div>
  );
};
