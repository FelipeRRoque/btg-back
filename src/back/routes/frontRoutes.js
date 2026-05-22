const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'login.html'));
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'home.html'));
});

router.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'perfil.html'));
});

router.get('/culturas', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'culturas.html'));
});

router.get('/areas-plantio', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'areas-plantio.html'));
});

router.get('/area-detalhes', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'area-detalhes.html'));
});

module.exports = router;