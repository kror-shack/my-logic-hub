body {
  font-family: Arial, sans-serif;
}

.open-sidebar-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  max-width: 500px;
  min-width: 320px;
  height: 100%;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  transition: left 0.3s ease;
  z-index: 1001;
  overflow-y: auto;
  padding: 20px;

  &.open {
    left: 0;
  }

  .close-sidebar-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
