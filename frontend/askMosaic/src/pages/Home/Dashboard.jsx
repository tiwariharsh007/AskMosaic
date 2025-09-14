// Dashboard.jsx
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { LuPlus } from 'react-icons/lu'
import toast from 'react-hot-toast';
import { CARD_BG } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from 'moment';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/Loader/DeleteALertContent';

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  });

//   const fetchAllSessions = async () => {
//   try {
//     const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
//     setSessions(response.data);
//   } catch (error) {
//       console.error("Error fetching sessions:", error.message);
//   }
// };

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      console.log("Fetched sessions:", response.data);
      setSessions(response.data || []);  // Correct: response.data is the sessions array
    } catch (error) {
      console.error("Error fetching sessions:", error.message);
    }
  };




  const deleteSession = async (sessionData) => {
    try{
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session deleted successfully.");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
    } catch(error){
        console.log('Error deleting session data:', error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || []}
              experience={data?.experience || "-"}
              questions={data?.questions || "-"}
              description={data?.description || "-"}
              lastUpdated={
                data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-indigo-600 text-white text-sm font-semibold px-7 py-2.5 rounded-full hover:bg-indigo-700 transition-colors cursor-pointer hover:shadow-2xl hover:shadow-indigo-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >

          <LuPlus className='text-2xl text-white' />
          Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
        >
          <div>
            <CreateSessionForm />
          </div>
        </Modal>

        <Modal
          isOpen={openDeleteAlert?.open}
          onClose={() => {
            setOpenDeleteAlert({open : false, data : null});
          }}
          title= "Delete Alert"
        >
          <div className='w-[30vw]'>
            <DeleteAlertContent
              content = "Are you sure you want to delete this session details?"
              onDelete={() => deleteSession(openDeleteAlert.data)}
            />
          </div>
        </Modal>

    </DashboardLayout>
  )
}

export default Dashboard;
