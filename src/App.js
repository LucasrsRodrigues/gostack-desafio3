import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });

    
  }, []);


  async function handleAddRepository() {
    // TODO-> OK
    const newProject = {
      title: `Novo repositorio ${Date.now()}`,
	    url: `https://github.com/Novo-projeto-${Date.now()}`,
      techs:[
        "Node.js",
        "React Native",
        "React"
      ]
    };

    const response = await api.post('repositories', newProject);

    setRepositories([...repositories, response.data]);
    
   
  }

  async function handleRemoveRepository(id) {
    // TODO
    let newRep = [...repositories];

    const response = await api.delete(`repositories/${id}`);

    if(response){
      newRep = newRep.filter(rep => rep.id !== id);
      setRepositories(newRep);
    }
    

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
