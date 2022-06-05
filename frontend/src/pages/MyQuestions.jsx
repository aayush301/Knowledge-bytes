import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';

const MyQuestions = () => {
  const [fetchData, { loading }] = useFetch();
  const authState = useSelector(state => state.authReducer);
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    if (authState.loading) return;
    document.title = `My Questions | ${authState.user?.name}`;
  }, [authState]);


  useEffect(() => {

    if (authState.loading) return;
    const fetchQuestions = async () => {
      const config = { url: "/questions/me", method: "get", headers: { Authorization: authState.token } };
      const { questions } = await fetchData(config, { showSuccessToast: false });
      setQuestions(questions);
    }

    fetchQuestions();
  }, [authState, fetchData]);


  const getFormattedDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric" });
  }


  if (authState.loading) {
    return <div className='my-40'><Loader className='mx-auto' /></div>;
  }

  return (
    <>
      <MainLayout>
        <div className='m-8'>
          <h2 className='mb-3 dark:text-gray-300 font-semibold text-xl rounded-sm'>Questions asked by me</h2>

          {loading ? (
            <div className='my-40'><Loader className='mx-auto' /></div>
          ) : (
            <>
              <h4 className='text-emerald-400 dark:text-gray-300 text-lg font-semibold'>{questions.length} Questions</h4>
              <div className='text-[17px]'>
                {questions.map(question => (
                  <div key={question._id} className={`my-4 bg-gray-100 dark:bg-ui-dark-primary p-3 rounded-sm ${question.ansCount ? "border-l-2 border-green-500" : ""}`}>
                    <div>
                      <Link to={`/questions/${question.slug}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{question.title}</Link>
                    </div>

                    <div className='flex'>
                      {question.ansCount ? (
                        <span className='text-green-500 font-semibold'>{question.ansCount} Answers</span>
                      ) : (
                        <span className='text-gray-800 dark:text-gray-300'>No Answers yet</span>
                      )}
                      <span className='ml-auto dark:text-gray-300'>asked at {getFormattedDate(question.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>


      </MainLayout>
    </>
  )
}

export default MyQuestions