import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Wrapper } from './components/Wrapper';
import { MainComponent } from './components/MainComponent/MainSlide';
import { FullPost } from './components/FullPost/FullPost';
import { CreatePost } from './components/CreatePost/CreatePost';
import { LoginComponent } from './components/Auth/Login';
import { RegistrComponent } from './components/Auth/Regist';
import { TagsComponent } from './components/Tags/TagsComponent';

function App() {
  return (
   <Routes>
    <Route path='/' element={<Wrapper/>}>
    <Route index element={<MainComponent/>}/>
    <Route path='/fullpost/:id' element={<FullPost/>}/>
    <Route path='/fullpost/:id/edit' element={<CreatePost/>}/>
    <Route path='/createpost' element={<CreatePost/>}/>
    <Route path='/tags' element={<TagsComponent/>}/>
    <Route path='/login' element={<LoginComponent/>}/>
    <Route path='/registr' element={<RegistrComponent/>}/>
    </Route>
   </Routes>
  );
}

export default App;
