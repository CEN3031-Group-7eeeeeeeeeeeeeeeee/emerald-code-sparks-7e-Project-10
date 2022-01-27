import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Table } from 'antd';
import './DayLevelReport.less';

import NavBar from '../../components/NavBar/NavBar';
import { getSessions, getSessionCount, getGrades } from '../../Utils/requests';

export default function DayLevelReport() {
  const [sessions, setSessions] = useState([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [gradeList, setGradeList] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [sessionRes, sessionCountRes] = await Promise.all([
        getSessions(
          searchParams.has('page') ? (searchParams.get('page') - 1) * 10 : 0
        ),
        getSessionCount(),
      ]);

      if (sessionRes.error) {
        console.error(sessionRes.error);
      }
      setSessions(sessionRes.data);
      console.log(sessionRes.data);

      setSessionCount(sessionCountRes.data);
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const fetchGradeList = async () => {
      const gradesRes = await getGrades();
      if (gradesRes.error) {
        console.error(gradesRes.error);
      }

      let list = {};
      gradesRes.data.forEach((grade) => {
        list[grade.id] = grade.name;
      });
      setGradeList(list);
      console.log(list);
    };
    fetchGradeList();
  }, []);

  function formatMyDate(value, locale = 'en-US') {
    let output = new Date(value).toLocaleDateString(locale);
    return output + ' ' + new Date(value).toLocaleTimeString(locale);
  }

  const columns = [
    {
      title: 'Student',
      key: 'student',
      width: '3%',
      align: 'left',
      render: (_, key) => <div>{key.students[0].name}</div>,
    },
    {
      title: 'Classroom',
      key: 'classroom',
      dataIndex: ['classroom', 'name'],
      width: '6%',
      align: 'left',
    },
    {
      title: 'Grade',
      dataIndex: ['classroom', 'grade'],
      key: 'grade',
      width: '3%',
      align: 'left',
      render: (_, key) => <div>{gradeList[key.classroom.grade]}</div>,
    },
    {
      title: 'Session Started',
      dataIndex: 'created_at',
      key: 'sessionStart',
      width: '6%',
      align: 'left',
      render: (_, key) => <div>{formatMyDate(key.created_at)}</div>,
    },
    {
      title: 'Partners',
      key: 'hasPartners',
      width: '3%',
      align: 'left',
      render: (_, key) => (
        <div>
          {key.students
            .slice(1)
            .map((student) => student.name)
            .join(', ')}
        </div>
      ),
    },
    {
      title: 'View Report',
      dataIndex: 'enrolled',
      key: 'enrolled',
      width: '3%',
      align: 'right',
      render: (_, session) => (
        <Link to={`/daylevel/${session.id}`}>View Report</Link>
      ),
    },
  ];
  return (
    <div className='container nav-padding'>
      <NavBar />
      <div className='menu-bar'>
        <div id='day-level-report-header'>Day Level - Student Report</div>

        {/* Menu to return to landing page at /reports */}
        <button
          id={'day-level-return'}
          className={`btn-${'primary'} btn-${'sm'}`}
          type='button'
          onClick={() => navigate('/report')}
        >
          Return to Dashboard
        </button>
      </div>

      <main id='table-wrapper'>
        <Table
          columns={columns}
          dataSource={sessions}
          rowKey='id'
          onChange={(Pagination) => {
            setSearchParams({ page: Pagination.current });
          }}
          pagination={{
            defaultCurrent: 1,
            defaultPageSize: 10,
            total: sessionCount,
          }}
        />
      </main>
    </div>
  );
}
