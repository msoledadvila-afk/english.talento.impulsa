// src/components/AuthGate.jsx
// Envuelve la app: si no hay sesión, muestra Login/Registro.
// El registro exige un código de invitación válido (colección invite_codes).
import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  increment,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import "./AuthGate.css";

function mapError(code, fallback) {
  const messages = {
    CODE_NOT_FOUND: "Código de invitación inválido.",
    CODE_INACTIVE: "Este código ya no está activo.",
    CODE_EXHAUSTED: "Este código alcanzó su cupo máximo de usos.",
    PASSWORD_MISMATCH: "Las contraseñas no coinciden.",
    "auth/email-already-in-use": "Ya existe una cuenta con ese email. Iniciá sesión.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/invalid-email": "El email no es válido.",
    "auth/wrong-password": "Email o contraseña incorrectos.",
    "auth/invalid-credential": "Email o contraseña incorrectos.",
    "auth/user-not-found": "Email o contraseña incorrectos.",
    "auth/too-many-requests": "Demasiados intentos. Probá de nuevo en unos minutos.",
  };
  return messages[code] || fallback || "Ocurrió un error. Probá de nuevo.";
}

export default function AuthGate({ children }) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  const [mode, setMode] = useState("register"); // 'register' | 'login'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(mapError("PASSWORD_MISMATCH"));
      return;
    }

    setSubmitting(true);
    try {
      const codeTrimmed = inviteCode.trim().toUpperCase();
      const q = query(collection(db, "invite_codes"), where("code", "==", codeTrimmed));
      const snap = await getDocs(q);

      if (snap.empty) {
        setError(mapError("CODE_NOT_FOUND"));
        setSubmitting(false);
        return;
      }

      const codeDoc = snap.docs[0];
      const data = codeDoc.data();

      if (!data.active) {
        setError(mapError("CODE_INACTIVE"));
        setSubmitting(false);
        return;
      }
      if (data.usedCount >= data.maxUses) {
        setError(mapError("CODE_EXHAUSTED"));
        setSubmitting(false);
        return;
      }

      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "invite_codes", codeDoc.id), {
        usedCount: increment(1),
      });

      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        origen: data.origen || "",
        createdAt: Date.now(),
      });
      // onAuthStateChanged se encarga de actualizar `user` y mostrar la app
    } catch (err) {
      setError(mapError(err.code, err.message));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(mapError(err.code, err.message));
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingAuth) {
    return (
      <div className="authgate-screen">
        <div className="authgate-loading">Cargando…</div>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return (
    <div className="authgate-screen">
      <div className="authgate-card">
        <div className="authgate-brand">
          <span className="authgate-brand-name">English Hub</span>
          <span className="authgate-brand-tag">by Talento Impulsa</span>
        </div>

        <div className="authgate-tabs">
          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => { setMode("register"); setError(""); }}
          >
            Crear cuenta
          </button>
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Ya tengo cuenta
          </button>
        </div>

        {mode === "register" ? (
          <form onSubmit={handleRegister} className="authgate-form">
            <label>
              Código de invitación
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Ej: TEST2026"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </label>
            <label>
              Repetir contraseña
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={6}
                required
              />
            </label>
            {error && <p className="authgate-error">{error}</p>}
            <button type="submit" disabled={submitting}>
              {submitting ? "Creando cuenta…" : "Crear cuenta"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="authgate-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className="authgate-error">{error}</p>}
            <button type="submit" disabled={submitting}>
              {submitting ? "Ingresando…" : "Ingresar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
