import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { setCredentials } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../../shared/Modal/Modal";
import s from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.auth
  );

  const [id, setId] = useState(idInstance);
  const [apiToken, setApiToken] = useState(apiTokenInstance);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (idInstance && apiTokenInstance) {
      navigate("/chat");
    }
  }, [idInstance, apiTokenInstance, navigate]);

  const handleLogin = () => {
    if (!id || !apiToken) {
      alert("Please enter both idInstance and apiTokenInstance");
      return;
    }

    dispatch(setCredentials({ idInstance: id, apiTokenInstance: apiToken }));
    localStorage.setItem("idInstance", id);
    localStorage.setItem("apiTokenInstance", apiToken);

    navigate("/chat");
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title="Login"
      closable={false}
    >
      <input
        type="text"
        placeholder="idInstance"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className={s.input}
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiToken}
        onChange={(e) => setApiToken(e.target.value)}
        className={s.input}
      />
      <button onClick={handleLogin} className={s.loginButton}>
        Login
      </button>
    </Modal>
  );
};

export default Login;
