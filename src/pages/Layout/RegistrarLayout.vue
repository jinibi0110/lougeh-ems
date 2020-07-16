<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar>
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <h5><center> Welcome Back Registrar!</center></h5>
      <sidebar-link to="/registrar">
        <md-icon>person</md-icon>
        <p>Add Student Information</p>
      </sidebar-link>
      <sidebar-link to="/enrollsubject">
        <md-icon>library_books</md-icon>
        <p>Enroll Subjects</p>
      </sidebar-link>
      <sidebar-link to="/encodegrade">
        <md-icon>library_books</md-icon>
        <p>Encode Grades</p>
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
