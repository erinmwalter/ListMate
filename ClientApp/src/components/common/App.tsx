import React, { Component, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Layout from './Layout';
import GroupComponent from '../group/GroupComponent';


export default function App() {

    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/group/:id" element = {<GroupComponent/>}/>
        </Routes>
      </Layout>
    );
  }

function getAccessTokenSilently() {
  throw new Error('Function not implemented.');
}
