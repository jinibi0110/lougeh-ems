<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Role ID">{{ item.roleid }}</md-table-cell>
        <md-table-cell md-label="Role Description">{{ item.roledesc }}</md-table-cell>
        <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
        <md-table-cell md-label="Action">{{ item.action }}
          <md-button class="md-success fa fa-trash"> Update</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "roles-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: [
        {
          roleid: "1",
          roledesc: "Student",
          status: "Active"
        },
        {
          roleid: "2",
          roledesc: "Registrar",
          status: "Active"
        },
        {
          roleid: "3",
          roledesc: "Admin",
          status: "Active"
        }
      ]
    };
  }
};
</script>
