<template>
  <div class="sinfo">
    <div>
      <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add Student Information</md-dialog-title>
      <md-dialog-content class="md-scrollbar">
        <form student="form">
          <md-field>
            <md-input alternative
              placeholder="Student ID"
              id="sid" 
              v-model="formFields.sid">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              placeholder="Given Name"
              id="givenname"
              v-model="formFields.givenname">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              placeholder="Surname"
              id="surname"
              v-model="formFields.surname">
            </md-input>
          </md-field>
          <md-datepicker v-model="selectedDate" md-immediately>
            <label>Date Of Birth</label>
          </md-datepicker>
          <md-field>
            <md-input alternative
              placeholder="Year Level"
              id="yearlevel"
              v-model="formFields.yearlevel">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              placeholder="Year Enrolled"
              id="yearenrolled"
              v-model="formFields.yearenrolled">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              placeholder="Course Code"
              id="courseid"
              v-model="formFields.courseid">
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
        <md-button class="md-info" @click="addInfo()">Add</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-info md-raised" @click="showDialog = true">Add</md-button>
    </div>
    <div id="data">
      <br>
      <md-table v-model="infos" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Student ID">{{ item.sid }}</md-table-cell>
          <md-table-cell md-label="Given Name">{{ item.givenname }}</md-table-cell>
          <md-table-cell md-label="Last Name">{{ item.surname }}</md-table-cell>
          <md-table-cell md-label="Date of Birth">{{ item.selectedDate }}</md-table-cell>
          <md-table-cell md-label="Year Level">{{ item.yearlevel }}</md-table-cell>
          <md-table-cell md-label="Year Enrolled">{{ item.yearenrolled }}</md-table-cell>
          <md-table-cell md-label="Course Code">{{ item.courseid }}</md-table-cell>
          <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
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
  name: "studentInfo-table",
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
        sid: null,
        givenname: null,
        surname: null,
        selectedDate: new Date('yyyy-mm-dd'),
        yearlevel: null,
        yearenrolled: null,
        courseid: null,
        status: "Active"
      },
      infos: [
        {
          sid: "2019-0010",
          givenname: "Anabelle",
          surname: "Belen",
          selectedDate: "1999-01-10",
          yearlevel: "1",
          yearenrolled: "2019",
          courseid: "BSIT",
          status: "Active"
        },
        {
          sid: "2015-0001",
          givenname: "EDWARD",
          surname: "SNOWDEN",
          selectedDate: "1999-11-24",
          yearlevel: "1",
          yearenrolled: "2015",
          courseid: "BSFISH",
          status: "Active"
        }
      ]
    }
  },
  methods:{
    addRole(){
      this.infos.push(
      {
        sid: this.formFields.sid,
        givenname: this.formFields.givenname,
        surname: this.formFields.surname,
        selectedDate: this.selectedDate,
        yearlevel: this.formFields.yearlevel,
        yearenrolled: this.formFields.yearenrolled,
        courseid: this.formFields.courseid,
        status: this.formFields.status
      }
      )
      this.showDialog = false
    },
  }
}
</script>
