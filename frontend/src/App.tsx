function App() {
  const fetchLogin = async () => {
    const response = await fetch('/login', {
      method: 'POST',
    });
    console.log(JSON.stringify(response));
  };

  const fetchUser = async () => {
    const response = await fetch('/user');
    console.log(JSON.stringify(response));
  };

  return (
    <>
      <button onClick={() => fetchLogin()}>login</button>
      <button onClick={() => fetchUser()}>user</button>
    </>
  );
}

export default App;
