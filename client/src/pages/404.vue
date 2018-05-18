<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">{{$t('apology')}}<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
      :label="$t('goback')"
    />
  </div>
</template>

<i18n>
{
  "es": {
    "apology": "Lo sentimos, aqui no hay nada...",
    "goback": "Volver"
  }
}
</i18n>
