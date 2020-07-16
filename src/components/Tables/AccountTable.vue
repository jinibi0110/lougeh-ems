<template>
  <div class="account">
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Add User</md-dialog-title>
          <md-dialog-content class="md-scrollbar">
            <form student="form">
              <md-field>
                <md-input alternative
                  placeholder="Role Description"
                  id="roledesc"
                  v-model="formFields.roledesc">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="Status"
                  id="status"
                  v-model="formFields.status"
                  readonly>
                </md-input>
              </md-field>
            </form>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-default" @click="showDialog = false">Cancel</md-button>
            <md-button class="md-info" @click="addUser()">Add</md-button>
          </md-dialog-actions>
      </md-dialog>
      <md-button class="md-info md-raised" @click="showDialog = true">Add</md-button>
    </div>

    <div id="data">
      <br>
      <md-table v-model="users" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="User ID">{{ item.uid }}</md-table-cell>
          <md-table-cell md-label="Password">{{ item.password }}</md-table-cell>
          <md-table-cell md-label="Role Description">{{ item.roledesc }}</md-table-cell>
          <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
          <md-table-cell md-label="Action">{{ item.action }}
            <md-button class="md-success"> Reset Password</md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "account-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showDialog: false,
      showDialogEdit: false,
      formFields:{
        roleid: null,
        roledesc: null,
        status: "Active"
      },
      users: [
        {
          uid: "2019-0009",
          password: "********",
          roledesc: "Student",
          status: "Active"
        },
        {
          uid: "2019-0011",
          password: "********",
          roledesc: "Registrar",
          status: "Active"
        }
      ],
    }
  },
  methods:{
    addUser(){
      this.users.push(
        {
          roledesc: this.formFields.roledesc,
          status: this.formFields.status
        }
      )
      this.showDialog = false
    },
  }
}
</script>
