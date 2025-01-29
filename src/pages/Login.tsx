import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.auth
  );

  const [id, setId] = useState(idInstance);
  const [apiToken, setApiToken] = useState(apiTokenInstance);

  useEffect(() => {
    if (idInstance && apiTokenInstance) {
      navigate("/chat"); // Redirect if already logged in
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
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="idInstance"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiToken}
        onChange={(e) => setApiToken(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
