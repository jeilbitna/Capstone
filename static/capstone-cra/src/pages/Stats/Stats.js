import React, { useEffect, useState } from "react";
import "../../styles/reset.css";
import "../../styles/common.css";
import "./Stats.css";
import HeaderNav from "../../components/Header/HeaderNav";
import LoginHeaderNav from "../../components/Header/LoginHeaderNav";

import { Link, useParams } from "react-router-dom";

import Chart from "../../services/Chart/Chart";

function Stats() {
  const jsonLocalStorage = {
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
  };

  const username = jsonLocalStorage.getItem("username");
  const [data, setData] = useState(null);
  const [selectedButton, setSelectedButton] = useState("weekly");

  const testdata = {
    kcal: [
      { x: "2023/06/05", y: 0 },
      { x: "2023/06/06", y: 0 },
      { x: "2023/06/07", y: 0 },
      { x: "2023/06/08", y: 0 },
      { x: "2023/06/09", y: 0 },
      { x: "2023/06/10", y: 0 },
      { x: "2023/06/11", y: 623.0 },
    ],
    carbon: [
      { x: "2023/06/05", y: 0 },
      { x: "2023/06/06", y: 0 },
      { x: "2023/06/07", y: 0 },
      { x: "2023/06/08", y: 0 },
      { x: "2023/06/09", y: 0 },
      { x: "2023/06/10", y: 0 },
      { x: "2023/06/11", y: 623.0 },
    ],
    pro: [
      { x: "2023/06/05", y: 0 },
      { x: "2023/06/06", y: 0 },
      { x: "2023/06/07", y: 0 },
      { x: "2023/06/08", y: 0 },
      { x: "2023/06/09", y: 0 },
      { x: "2023/06/10", y: 0 },
      { x: "2023/06/11", y: 623.0 },
    ],
    fat: [
      { x: "2023/06/05", y: 0 },
      { x: "2023/06/06", y: 0 },
      { x: "2023/06/07", y: 0 },
      { x: "2023/06/08", y: 0 },
      { x: "2023/06/09", y: 0 },
      { x: "2023/06/10", y: 0 },
      { x: "2023/06/11", y: 623.0 },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = jsonLocalStorage.getItem("token");

        // 토큰 유무 확인
        if (!token) {
          throw new Error("토큰이 없습니다.");
        }

        const apiUrl = "api/main/stats/";
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const responseJson = await response.json();
          const txt = await response.text();
          console.log("responseJson", responseJson);
          console.log("Txt", txt);
          setData(responseJson);
        } else {
          throw new Error("GET 요청에 실패했습니다.");
        }
      } catch (error) {
        console.error("GET 요청 오류:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = async (e) => {
    const type = e.target.value;
    console.log(type);
    setSelectedButton(type);
    try {
      const token = jsonLocalStorage.getItem("token");

      // 토큰 유무 확인
      if (!token) {
        throw new Error("토큰이 없습니다.");
      }

      const apiUrl = "api/main/stats/{type}";
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseJson = await response.json();
        setData(responseJson);
      } else {
        throw new Error("GET 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("GET 요청 오류:", error);
    }
  };

  return (
    <div>
      {username && <LoginHeaderNav username={username} />}
      {!username && <HeaderNav />}
      <div className="main stats-main">
        <div className="common-inner main-content stats-content">
          <div className="chart-nav">
            <button
              className="chart-btn"
              value="weekly"
              onClick={handleButtonClick}
              style={{
                backgroundColor:
                  selectedButton === "weekly" ? "rgb(60, 179, 113)" : "#d0d0d0",
                fontWeight: selectedButton === "weekly" ? "700" : "normal",
                color: selectedButton === "weekly" ? "white" : "black",
              }}
            >
              일주일
            </button>
            <button
              className="chart-btn"
              value="month"
              onClick={handleButtonClick}
              style={{
                backgroundColor:
                  selectedButton === "month" ? "rgb(60, 179, 113)" : "#d0d0d0",
                fontWeight: selectedButton === "month" ? "700" : "normal",
                color: selectedButton === "month" ? "white" : "black",
              }}
            >
              1개월
            </button>
            <button
              className="chart-btn"
              value="month3"
              onClick={handleButtonClick}
              style={{
                backgroundColor:
                  selectedButton === "month3" ? "rgb(60, 179, 113)" : "#d0d0d0",
                fontWeight: selectedButton === "month3" ? "700" : "normal",
                color: selectedButton === "month3" ? "white" : "black",
              }}
            >
              3개월
            </button>
            <button
              className="chart-btn"
              value="year"
              onClick={handleButtonClick}
              style={{
                backgroundColor:
                  selectedButton === "year" ? "rgb(60, 179, 113)" : "#d0d0d0",
                fontWeight: selectedButton === "year" ? "700" : "normal",
                color: selectedButton === "year" ? "white" : "black",
              }}
            >
              1년
            </button>
          </div>
          {data && <Chart data={data} />}
          {/* {testdata && <Chart data={testdata} />} */}
        </div>
      </div>
    </div>
  );
}
export default Stats;
