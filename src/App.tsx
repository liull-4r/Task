import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout"; // Import Layout
import BankManagement from "./pages/BankManagement";
import BankForm from "./components/forms/AddBank";
import EditBank from "./components/forms/EditBank";
import Login from "./components/forms/Login";
import TransactionManagement from "./pages/TransactionManagement";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<></>} />
          <Route path="/banks" element={<BankManagement />} />
          <Route path="/transactions" element={<TransactionManagement />} />
          <Route path="add-new-bank" element={<BankForm />} />
          <Route path="edit-bank/:code" element={<EditBank />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
