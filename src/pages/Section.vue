<template>
  <div id="section">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="section-table"
            :headers="headers"
            :items="sections"
            :search="search"
            sort-by="sectionid"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-text-field
                  id="search"
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
                      id="add-section"
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
                            <v-text-field
                              id="section"
                              v-model="editedItem.sectionid"
                              label="Section"
                            ></v-text-field>
                            <v-autocomplete
                              id="subject-code"
                              :items="subjects"
                              v-model="editedItem.subjectid"
                              label="Subject Code"
                              clearable
                            ></v-autocomplete>
                            <v-text-field
                              id="class-size"
                              v-model="editedItem.classsize"
                              label="Class Size"
                            ></v-text-field>
                            <v-switch
                              id="status"
                              v-model="editedItem.status"
                              :input-value="true"
                              @change="changeState(editedItem.sectionid)"
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
                id="edit-section"
                color="primary"
                dark
                class="mb-2"
                @click="editItem(item)"
                >Edit</v-btn
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
    subjects: [],
    headers: [
      {
        text: "Section",
        align: "left",
        sortable: true,
        value: "sectionid",
      },
      { text: "Subject Code", sortable: false, value: "subjectid" },
      { text: "Class Size", sortable: false, value: "classsize" },
      { text: "Status", sortable: false, value: "status" },
      { text: "Action", sortable: false, value: "action" },
    ],
    sections: [],
    editedIndex: false,
    editedItem: {
      sectionid: "",
      subjectid: "",
      classsize: null,
      status: "Active",
    },
    defaultItem: {
      sectionid: "",
      subjectid: "",
      classsize: null,
      status: "Active",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === false ? "Add Section" : "Edit Details";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize(), this.getSections(), this.selectSubject();
  },

  methods: {
    initialize() {
      this.sections = [];
    },

    editItem(item) {
      this.editedIndex = this.sections.indexOf(item);
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

    changeState(sectionid) {
      const token = localStorage.token;
      axios({
        method: "POST",
        url: "http://172.16.4.170:3000/api/sections/deactivate",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          sectionid: this.editedItem.sectionid,
          subjectid: this.editedItem.subjectid,
        },
      })
        .then((response) => {
          this.getSections();
        })
        .catch((error) => console.log(error.response.data));
    },

    getSections() {
      const token = localStorage.token;

      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/sections/list",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.sections = [];

        if (isArray(res.data.view)) {
          res.data.view.forEach((section) => {
            this.sections.push({
              sectionid: section.sectionid,
              subjectid: section.subjectid,
              classsize: section.classsize,
              status: section.active ? "Active" : null,
            });
          });
        }
      });
    },

    getSubs() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: `http://172.16.4.170:3000/api/subjects/subject/sections/${
          this.editedItem.subjectid
        }`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.subs = [];
        if (isArray(res.data)) {
          res.data.forEach((sub) => {
            this.subs.push({
              subjectid: sub.subjectid,
            });
          });
        }
      });
    },

    selectSubject() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/subjects/list",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.subjects = [];
        if (isArray(res.data)) {
          res.data.forEach((sub) => {
            this.subjects.push(sub.subjectid);
          });
        }
      });
    },

    save() {
      const token = localStorage.token;
      if (this.editedIndex) {
        axios({
          method: "PUT",
          url: "http://172.16.4.170:3000/api/sections/update",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            sectionid: this.editedItem.sectionid,
            subjectid: this.editedItem.subjectid,
            classsize: this.editedItem.classsize,
          },
        })
          .then((res) => {
            this.getSections();
          })
          .catch((err) => console.log(err.response.data));
        this.sections.push(this.editedItem);
      } else {
        axios({
          method: "POST",
          url: "http://172.16.4.170:3000/api/sections/add",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            sectionid: this.editedItem.sectionid,
            subjectid: this.editedItem.subjectid,
            classsize: this.editedItem.classsize,
          },
        })
          .then((res) => {
            this.getSections();
          })
          .catch((err) => console.log(err.response));
      }
      this.close();
    },
  },
};
</script>
