import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getStudentClassroom } from "../../Utils/requests";
import "./Student.less";

function Student() {
  const [learningStandard, setLessonModule] = useState({});
  const [allClassroomsAndLessons, setAllClassroomsAndLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          setAllClassroomsAndLessons(res.data);
        } else {
          message.error(res.err);
        }
      } catch {}
    };
    fetchData();
  }, []);

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem("my-activity", JSON.stringify(activity));

    navigate("/workspace");
  };

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="activity-container">
        <div id="header">
          <div>Select your Activity</div>
        </div>
        {/* <ul>
          {learningStandard.activities ? (
            learningStandard.activities
              .sort(
                (activity1, activity2) => activity1.number - activity2.number
              )
              .map((activity) => (
                <div
                  key={activity.id}
                  id="list-item-wrapper"
                  onClick={() => handleSelection(activity)}
                >
                  <li>{`${learningStandard.name}: Activity ${activity.number}`}</li>
                </div>
              ))
          ) : (
            <div>
              <p>There is currently no active learning standard set.</p>
              <p>
                When your classroom manager selects one, it will appear here.
              </p>
            </div>
          )}
        </ul> */}
        {allClassroomsAndLessons ? (
          allClassroomsAndLessons.map((classroom) => {
            return (
              <CourseLessons
                courseName={classroom.classroom.name}
                lessons={classroom.lesson_module}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function CourseLessons({ courseName, lessons }) {
  const navigate = useNavigate();
  const handleSelection = (activity) => {
    activity.lesson_module_name = lessons.name;
    localStorage.setItem("my-activity", JSON.stringify(activity));

    navigate("/workspace");
  };

  return (
    <div>
      <h1>{courseName}</h1>
      <ul>
        {lessons.activities ? (
          lessons.activities
            .sort((activity1, activity2) => activity1.number - activity2.number)
            .map((activity) => (
              <div
                key={activity.id}
                id="list-item-wrapper"
                onClick={() => handleSelection(activity)}
              >
                <li>{`${lessons.name}: Activity ${activity.number}`}</li>
              </div>
            ))
        ) : (
          <div>
            <p>There is currently no active learning standard set.</p>
            <p>When your classroom manager selects one, it will appear here.</p>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Student;
