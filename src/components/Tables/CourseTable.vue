<template>
  <div class="course">
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Add User</md-dialog-title>
          <md-dialog-content class="md-scrollbar">
            <form student="form">
              <md-field>
                <md-input alternative
                  placeholder="Course Code"
                  id="courseid" 
                  v-model="formFields.courseid">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="Course Description"
                  id="coursedesc"
                  v-model="formFields.coursedesc">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="Year Commenced"
                  id="yearcommenced"
                  v-model="formFields.yearcommenced">
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
            <md-button class="md-info" @click="addCourse()">Add</md-button>
          </md-dialog-actions>
      </md-dialog>
      <md-button class="md-info md-raised" @click="showDialog = true">Add</md-button>
    </div>

    <div id="data">
      <br>
      <md-table v-model="courses" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Course Code">{{ item.courseid }}</md-table-cell>
          <md-table-cell md-label="Course Description">{{ item.coursedesc }}</md-table-cell>
          <md-table-cell md-label="Year Commenced">{{ item.yearcommenced }}</md-table-cell>
          <md-table-cell md-label="Status"></md-table-cell>
          <md-table-cell md-label="Action">{{ item.action }}
            <md-button class="md-success"> Update</md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "course-table",
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
      formFields: {
        courseid: null,
        coursedesc: null,
        yearcommenced: null,
        status: "Active"
      },
      courses: [
        {
          courseid: "BSIT",
          coursedesc: "Bachelor of Science in Information Technology",
          yearcommenced: 2010,
          boolean: true
        },
        {
          courseid: "BSMATH",
          coursedesc: "Bachelor of Science in Mathematics",
          yearcommenced: 2005,
          boolean: false
        }
      ],
    }
  },
  methods:{
    addCourse(){
      this.subjects.push(
        {
          courseid: this.formFields.courseid,
          coursedesc: this.formFields.coursedesc,
          yearcommenced: this.formFields.yearcommenced,
          status: this.formFields.status
        }
      )
      this.showDialog = false
    },
  }
};
</script>

<style lang="scss" scoped>
  .md-switch {
    display: flex;
  }

  table {
    width: 100%;
    table-layout: fixed;

    th {
      text-align: left;
    }
  }
</style>
