import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Loader/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explaination, setExplaination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error fetching session details:", error);
      setErrorMsg("Failed to load session details. Please try again later.");
    }
  };

  const generateConceptExplaination = async (concept) => {
    if (!concept) {
      console.error("No concept/question provided.");
      setErrorMsg("Cannot generate explanation for empty question.");
      return;
    }

    try {
      setErrorMsg('');
      setExplaination(null);

      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question: concept }
      );

      if (response.data) {
        console.log(response.data);
        setExplaination(response.data);
      }

    } catch (error) {
      setExplaination(null);
      setErrorMsg("Failed to generate explaination, Try again later");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  const toggleQuestionPinStatus = async (questionId) => {
    try{
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      console.log("Pin/Unpin response:", response);

      if(response?.data && response?.data?.question){
        fetchSessionDetailsById();
      }
    } catch(error){
      console.error("Error toggling pin status:", error);
    }
  };

  // const uploadMoreQuestions = async () => {
  //   try{
  //     setIsUpdateLoader(true);

  //     const aiResponse = await axiosInstance.post(
  //       API_PATHS.AI.GENERATE_QUESTIONS,
  //       {
  //         role: sessionData?.role,
  //         experience: sessionData?.experience,
  //         topicsToFocus: sessionData?.topicsToFocus,
  //         numberOfQuestions: 10,
  //       }
  //     );

  //     const generatedQuestions = aiResponse.data;

  //     const response = await axiosInstance.post(
  //       API_PATHS.QUESTION.ADD_TO_SESSION,
  //       {
  //         sessionId,
  //         questions: generatedQuestions,
  //       }
  //     );

  //     if(response.data){
  //       toast.success("Added more Q&A!");
  //       fetchSessionDetailsById();
  //     }

  //   } catch(error){
  //       if(error.response && error.response.data.message){
  //         setError(error.response.data.message);
  //       } else {
  //         setError("Something went wrong. Please try again later.")
  //       }
  //   } finally {
  //     setIsUpdateLoader(false);
  //   }
  // };

const uploadMoreQuestions = async () => {
  try {
    setIsUpdateLoader(true);

    const aiResponse = await axiosInstance.post(
      API_PATHS.AI.GENERATE_QUESTIONS,
      {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      }
    );

    console.log('AI Response:', aiResponse.data);  // Debugging line

    const generatedQuestions = aiResponse.data;

    if (!Array.isArray(generatedQuestions)) {
      throw new Error("Generated questions should be an array");
    }

    const response = await axiosInstance.post(
      API_PATHS.QUESTION.ADD_TO_SESSION,
      {
        sessionId,
        questions: generatedQuestions,
      }
    );

    if (response.data) {
      toast.success("Added more Q&A!");
      fetchSessionDetailsById();
    }

  } catch (error) {
    console.error('Upload More Questions Error:', error);

    if (error.response && error.response.data.message) {
      setErrorMsg(error.response.data.message);
    } else {
      setErrorMsg(error.message || "Something went wrong. Please try again later.");
    }
  } finally {
    setIsUpdateLoader(false);
  }
};



  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, []);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
        <h2 className='text-lg font-semibold color-black'>Interview Q & A</h2>

        <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 100,
                    delay: index * 0.1,
                    damping: 15,
                  }}
                  layout
                  layoutId={`question-${data._id || index}`}
                >
                  <QuestionCard
                    question={data?.question}
                    answer={data?.answer}
                    onLearnMore={() =>
                      generateConceptExplaination(data?.question)
                    }
                    isPinned={data?.isPinned}
                    onTogglePin={() => toggleQuestionPinStatus(data?._id)}
                  />

                    {!isLoading && 
                      sessionData?.questions?.length == index + 1 && (
                        <div className='flex items-center justify-center mt-5'>
                          <button
                            className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer'
                            disabled= {isLoading || isUpdateLoader}
                            onClick={uploadMoreQuestions}
                          >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className='text-lg ' />
                              )}{" "}
                              Load More
                          </button>
                        </div>
                      )}

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={!isLoading && explaination?.title}
          >
            {errorMsg && (
              <p className='flex gap-2 text-sm text-amber-600 font-medium'>
                <LuCircleAlert className='mt-1'>{errorMsg}</LuCircleAlert>
              </p>
            )}

            {isLoading && <SkeletonLoader />}

            {!isLoading && explaination && (
              <AIResponsePreview content={explaination?.explanation} />
            )}
          </Drawer>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
