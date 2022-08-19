<script setup>

</script>
<template>
  <div id="myModal" class="my-modal-wrapper">
    <div class="my-modal">
      <!-- Modal header -->
      <div class="my-modal-header">
        <span>
          Terms of Service
        </span>
        <div class="modal-close-btn">
          &times;
          <span class="sr-only">Close modal</span>
        </div>
      </div>
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <p>
          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
          companies around the world are updating their terms of service agreements to comply.
        </p>
      </div>
      <!-- Modal footer -->
      <div>
        modal footer
      </div>
    </div>
  </div>
</template>

<style>
.my-modal-wrapper {
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
  min-width: 100%;
  height: 100%;
}

.my-modal {
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  width: 100%;
  z-index: 100;
  /* Modal width */
  max-width: 42rem;
  height: max-content;
  border-radius: 8px;
}

.my-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #ccc;
}

.modal-close-btn {
  color: rgb(156 163 175);
  font-size: 25px;
  cursor: pointer;
  border-radius: 8px;
  margin-left: auto;
  padding: 0 5px;
  align-items: center;
  border: none;
}

.modal-close-btn:hover {
  background-color: rgb(229 231 235);
  color: rgb(17 24 39);
}
</style>