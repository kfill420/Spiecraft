<script setup>

</script>

<template>
  <form action="">
    <input type="radio" name="rdo" id="yes" checked />
    <input type="radio" name="rdo" id="no" />
    <div class="switch">
      <label for="yes">Oui</label>
      <label for="no">Non</label>
      <div class="switch_logo">
        <span></span>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.switch {
  position: relative;
  display: flex;
  text-align: center;
  background: #4cd964;
  transition: all 0.2s ease;
  border-radius: 100px;

  &_logo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
  }

  span {
    position: relative;
    left: 13%;
    width: 20px;
    height: 4px;
    background: white;
    display: block;
    transform: rotate(-45deg);
    transition: all .2s ease;
    border-radius: 2px;

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 4px;
      height: 12px;
      margin-top: -8px;
      background: white;
      transition: all .2s ease;
      border-radius: 2px;
    }
  }
}

input[type=radio] {
  display: none;
}

.switch label {
  cursor: pointer;
  color: rgba(#000, .2);
  width: 60px;
  line-height: 2.5rem;
  transition: all 0.2s ease;
  color: white;
}

#no:checked~.switch {
  background: #ff3b30;
}

#no:checked~.switch span {
  background: white;

  &:after {
    background: white;
    height: 20px;
    margin-top: -8px;
    margin-left: 8px;
  }
}

#yes:checked~.switch label[for=no] {
  display: none;
}

#no:checked~.switch label[for=yes] {
  display: none;
}
</style>
