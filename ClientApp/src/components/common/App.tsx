import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Layout from './Layout';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    );
  }
}