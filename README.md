# Explorata

[![Build Status](https://travis-ci.org/melalj/explorata.svg?branch=master)](https://travis-ci.org/melalj/explorata)

## What is it?

Explore your Facebook Messenger data with fun and meaningful visualisations. 

Explorata is open-source and built upon the “privacy by design” principle. It uses Progressive Web App to run it offline and uses Web Workers for data processing.
All the computing is done right on your browser and nothing goes out to any external server (the website is hosted on the static Github Pages platform - and the code source is totally open). You can read more about the technical implementation on this article.

If you are interested in adding more visualization of analyse more data sources, open a Pull request! #OpenSource

## Why did we build it?

Ever wondered who are the people you message most? With whom you have the longest streaks? The day you exchanged most messages? Why?

We have been on Facebook for years, exchanged thousands of messages and yet, stuck on their servers, our data remains unexplorable.

## Features

- Progressive Web App with Web Workers: All the processing is proceed right on your browser and nothing goes out to any external server. You can read more about the implementation with this article.
- Fun visualisations like most messaged people, streaks, and more!
- Click on a person or a visualisation to see your conversations in context!

## Stack

<p>
  Explorata is based out of the Create React App boileter place, and uses <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://ant.design">Ant.design</a>, <a href="http://recharts.org">Recharts</a> and <a href="https://github.com/react-dropzone/react-dropzone">React Dropzone</a>.
</p>

## Install

## Starting Development

Start the app in the dev environment:

```bash
$ yarn start
```

## Build for Production

To package apps for the local platform:

```bash
$ yarn build
```
