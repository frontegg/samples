<template>
  <main>
    <h1>Home page</h1>
    <h1>Logged In: {{ userEmail }}</h1>
    <h1>Active Tenant: {{ activeTenant.name }}</h1>
    <NuxtLink to="/account/logout">Logout</NuxtLink>
    <br/>
    <br/>
    <br/>

    <h4>Available Tenants:</h4>
    <span v-for="tenant in tenants" :key="tenant.tenantId">
      <button v-on:click="switchTenant(tenant.tenantId)" :disabled="activeTenant.tenantId === tenant.tenantId">
        {{ tenant.name }} {{ activeTenant.tenantId === tenant.tenantId ? '(Active)' : '' }}
      </button>
      &nbsp;
      &nbsp;
    </span>
    <br/>
    <br/>
    <br/>
  </main>
</template>


<script type="ts">
import Vue from 'vue'
import { isAuthenticatedGuard, mapAuthActions } from '@frontegg/vue'

export default Vue.extend({
  beforeRouteEnter: isAuthenticatedGuard,

  data () {
    return {
      ...this.mapAuthState(),
      ...this.mapTenantsState(),
    }
  },
  methods: {
    _switchTenant: mapAuthActions('switchTenant'),
    switchTenant (tenantId) {
      this._switchTenant({ tenantId })
    }
  },
  computed: {
    userEmail () {
      return this.authState.user?.email ?? 'Not Logged In'
    },
    tenants () {
      const { tenants } = this.tenantsState
      return [...tenants].sort((a, b) => a.name.localeCompare(b.name))
    },
    activeTenant () {
      const {
        tenants,
        loading
      } = this.tenantsState
      const { user } = this.authState
      if (loading) {
        return { name: 'loading...' }
      }
      return tenants?.find(({ tenantId }) => tenantId === user?.tenantId) ?? {}
    }
  }
})
</script>
