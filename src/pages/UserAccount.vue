<template>
  <div id="subjects">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="user-account-table"
            :headers="headers"
            :items="users"
            :search="search"
            sort-by="uid"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-text-field
                  id="seacrh"
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>

                <div class="flex-grow-1"></div>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      id="btn-add-user-accnt"
                      color="info"
                      dark
                      class="mb-2"
                      v-on="on"
                      >Add</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="10" md="12">
                            <v-select
                              v-model="editedItem.roleid"
                              label="Role Description"
                              :items="roles"
                              item-value="id"
                              item-text="desc"
                              id="role-desc"
                            >
                            </v-select>
                            <v-label><h5>Status</h5></v-label>
                            <v-switch
                              id="status"
                              v-model="editedItem.status"
                              :input-value="true"
                              @change="changeState(editedItem.roleid)"
                            ></v-switch>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        id="btn-cancel"
                        color="default darken-1"
                        text
                        @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn
                        id="btn-save"
                        color="blue darken-1"
                        text
                        @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                id="btn-edit-user-accnt"
                color="primary"
                class="mr-2"
                @click="editItem(item)"
                >Edit</v-btn
              >
              <v-btn id="btn-reset-password" color="default" @click="reset()"
                >Reset Password</v-btn
              >
            </template>
          </v-data-table>
        </v-app>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { isArray } from "util";

export default {
  data: () => ({
    dialog: false,
    search: "",
    roles: [{ id: 2, desc: "REGISTRAR" }, { id: 3, desc: "ADMIN" }],
    headers: [
      {
        text: "User ID",
        align: "left",
        sortable: true,
        value: "uid",
      },
      { text: "Password", sortable: false, value: "password" },
      { text: "Role Description", sortable: false, value: "roledesc" },
      { text: "Status", sortable: false, value: "status" },
      { text: "Action", sortable: false, value: "action" },
    ],
    users: [],
    editedIndex: false,
    editedItem: {
      uid: "",
      password: "",
      roledesc: "",
      roleid: null,
      status: "Active",
    },
    defaultItem: {
      uid: "",
      password: "",
      roledesc: "",
      status: "Active",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === false ? "Add User" : "Edit Details";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize(), this.getUsers();
  },

  methods: {
    initialize() {
      this.users = [];
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = false;
      }, 300);
    },

    changeState(roleid) {
      const token = localStorage.token;
      axios({
        method: "POST",
        url: "http://172.16.4.170:3000/api/accounts/deactivate",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          uid: this.editedItem.uid,
        },
      })
        .then((response) => {
          const accountIndex = this.users.findIndex(
            (account) => account.uid === response.data.view.account.uid
          );
          this.users = [];
          this.getUsers();
        })
        .catch((error) => console.log(error.response));
    },

    getUsers() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/accounts/list",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          uid: this.editedItem.uid,
        },
      }).then((res) => {
        this.users = [];
        if (isArray(res.data)) {
          res.data.forEach((user) => {
            this.users.push({
              uid: user.uid,
              password: "******",
              roledesc: user.role.roledesc,
              roleid: user.role.roleid,
              status: user.active ? "Active" : "",
            });
          });
        }
      });
    },

    reset() {
      const token = localStorage.token;
      console.log(this.editedItem.uid);
      axios({
        method: "POST",
        url: "http://172.16.4.170:3000/api/accounts/resetpass",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          uid: this.editedItem.uid,
        },
      })
        .then((res) => {
          this.getUsers();
        })
        .catch((err) => console.log(err.response.data));
      alert(err.res.data.view.message);
    },

    save() {
      const token = localStorage.token;
      if (this.editedIndex) {
        axios({
          method: "POST",
          url: "http://172.16.4.170:3000/api/accounts/updaterole",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            uid: this.editedItem.uid,
            roleid: this.editedItem.roleid,
            status: this.editedItem.status,
          },
        })
          .then((res) => {
            this.getUsers();
          })
          .catch((err) => console.log(err.response.data));
        this.users.push(this.editedItem);
      } else {
        axios({
          method: "POST",
          url: "http://172.16.4.170:3000/api/accounts/newaccount",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            roleid: this.editedItem.roleid,
          },
        })
          .then((res) => {
            this.getUsers();
          })
          .catch((err) => console.log(err.response));
      }
      this.close();
    },
  },
};
</script>
