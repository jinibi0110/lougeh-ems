<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar>
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <h5><center> Welcome Back Student!</center></h5>
      <sidebar-link to="/student">
        <md-icon>person</md-icon>
        <p>View Profile</p>
      </sidebar-link>
      <sidebar-link to="/viewgrades">
        <md-icon>library_books</md-icon>
        <p>View Grades</p>
      </sidebar-link>
      <sidebar-link to="/prospectus">
        <md-icon>library_books</md-icon>
        <p>View Prospectus</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
  }
};
</script>

<style scoped>
h5{
  color: #fff;
}
</style>
