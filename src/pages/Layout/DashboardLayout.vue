<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar>
      <!-- //<mobile-menu slot="content"></mobile-menu> -->
      <h5><center> Welcome Back Admin!</center></h5>
      <sidebar-link to="/dashboard">
        <md-icon>verified_user</md-icon>
        <p>User Accounts</p>
      </sidebar-link>
      <sidebar-link to="/courses">
        <md-icon>library_books</md-icon>
        <p>Courses</p>
      </sidebar-link>
      <sidebar-link to="/subjects">
        <md-icon>library_books</md-icon>
        <p>Subjects</p>
      </sidebar-link>
      <sidebar-link to="/sections">
        <md-icon>view_column</md-icon>
        <p>Sections</p>
      </sidebar-link>
      <sidebar-link to="/schoolyear">
        <md-icon>calendar_today</md-icon>
        <p>School Year</p>
      </sidebar-link>
      <sidebar-link to="/studentinfo">
        <md-icon>person</md-icon>
        <p>Student Information</p>
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
