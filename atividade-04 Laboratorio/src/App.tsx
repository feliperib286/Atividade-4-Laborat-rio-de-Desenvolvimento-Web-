import { useState } from 'react';
import { useUsers } from './useUsers';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';
import { addHabit, filterHabits } from './habitSlice';
import './App.css';

function App() {
  const { users, addNewUser } = useUsers();
  const dispatch = useDispatch();
  
  const [userName, setUserName] = useState('');
  const [userError, setUserError] = useState(false);

  const [habitName, setHabitName] = useState('');
  const [category, setCategory] = useState('Saúde');
  const [habitError, setHabitError] = useState(false);

  const habits = useSelector((state: RootState) => state.habits.list);
  const currentFilter = useSelector((state: RootState) => state.habits.filter);

  const filteredHabits = currentFilter === 'Todos' 
    ? habits 
    : habits.filter(h => h.categoria === currentFilter);

  const handleAddUser = () => {
    if (userName.trim() === '') {
      setUserError(true); 
      return;
    }
    addNewUser(userName);
    setUserName('');
    setUserError(false);
  };

  const handleAddHabit = () => {
    if (habitName.trim() === '') {
      setHabitError(true); 
      return;
    }
    dispatch(addHabit({ 
      id: Date.now(), 
      nome: habitName, 
      categoria: category 
    }));
    setHabitName('');
    setHabitError(false);
  };

  return (
    <div className="container">
      <h1>Mini Dashboard</h1>

      <div className="dashboard">
        
        <section>
          <h2>Gerenciar Usuários</h2>
          <input 
            className={userError ? 'input-error' : ''}
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
            placeholder="Nome do usuário"
          />
          {userError && <p style={{ color: 'red' }}>Por gentileza, insira um nome válido</p>} 
          
          <button onClick={handleAddUser}>Cadastrar Usuário</button>
          
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Gerenciar Hábitos</h2>
          <input 
            className={habitError ? 'input-error' : ''}
            value={habitName} 
            onChange={(e) => setHabitName(e.target.value)} 
            placeholder="Novo hábito"
          />
          {habitError && <p style={{ color: 'red' }}>Por gentileza, insira um hábito válido</p>} 

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Saúde">Saúde</option>
            <option value="Estudo">Estudo</option>
            <option value="Lazer">Lazer</option>
          </select>

          <button onClick={handleAddHabit}>Adicionar Hábito</button>

          <div className="filter-group">
            <h3>Filtrar por Categoria:</h3>
            <select onChange={(e) => dispatch(filterHabits(e.target.value))}>
              <option value="Todos">Todos</option>
              <option value="Saúde">Saúde</option>
              <option value="Estudo">Estudo</option>
              <option value="Lazer">Lazer</option>
            </select>
          </div>

          <ul>
            {filteredHabits.map(h => (
              <li key={h.id}>
                <span>{h.nome}</span>
                <span className="badge">{h.categoria}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}

export default App;