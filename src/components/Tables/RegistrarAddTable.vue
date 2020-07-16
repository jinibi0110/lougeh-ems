<template>
<div class="studentedit">
  <!--
    <modal name="content" :show.sync="modals.modalEdit"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-sm">
      <card type="secondary" shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0">
      <template>
        <p>Edit Student Information</p>
          <form student="form">
            <md-input alternative
              id="sid" 
              v-model="formFields.sid"
              readonly>
            </md-input>
            <md-input alternative
              id="givenname" 
              v-model="formFields.givenname">
            </md-input>
            <md-input alternative
              id="surname" 
              v-model="formFields.surname">
            </md-input>
            <md-input alternative
              id="dob" 
              v-model="formFields.dob">
            </md-input>
            <md-input alternative
              id="yearlevel" 
              v-model="formFields.yearlevel">
            </md-input>
            <md-input alternative
              id="yearenrolled" 
              v-model="formFields.yearenrolled"
              readonly>
            </md-input>
            <md-input alternative
              id="courseid" 
              v-model="formFields.courseid">
            </md-input>
            <div class="text-center">
              <md-button type="success" class="my-4" @click="editStudent()">Edit</md-button>
            </div>
          </form>
        </template>
      </card>
    </modal> -->

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
        <md-button class="md-info" @click="addRole()">Add</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-button class="md-info md-raised" @click="showDialog = true">Add</md-button>
  </div>

  <div>
    <md-dialog :md-active.sync="showDialogEdit">
      <md-dialog-title>Edit Student Information</md-dialog-title>
      <md-dialog-content class="md-scrollbar">
        <form student="form">
          <md-field>
            <md-input alternative
              placeholder="Student ID"
              id="sid" 
              v-model="infos.sid">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              placeholder="Given Name"
              id="givenname"
              v-model="infos.givenname">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              placeholder="Surname"
              id="surname"
              v-model="infos.surname">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              placeholder="Date Of Birth"
              id="dob"
              v-model="infos.dob">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              placeholder="Year Level"
              id="yearlevel"
              v-model="infos.yearlevel">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              placeholder="Year Enrolled"
              id="yearenrolled"
              v-model="infos.yearenrolled">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              id="courseid"
              v-model="infos.courseid">
            </md-input>
          </md-field>
          <md-field>
            <md-input alternative
              id="status"
              v-model="infos.status"
              readonly>
            </md-input>
          </md-field>
          </form>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-default" @click="showDialogEdit = false">Cancel</md-button>
        <md-button class="md-info" @click="editStudent()">Edit</md-button>
      </md-dialog-actions>
    </md-dialog>
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
          <md-button class="md-success" @click="showDialogEdit = true"> Update</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</div>
</template>

<script>
export default {
  
  name: "registrarAdd-table",
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
          yearenrolled: "2015",
          courseid: "BSIT",
          status: "Active"
        },
        {
          sid: "2019-0011",
          givenname: "Rey Brian",
          surname: "Astudillo",
          selectedDate: "1999-11-24",
          yearlevel: "3",
          yearenrolled: "2018",
          courseid: "BSBIO",
          status: "Active"
        }
      ],
    }
  },
  methods:{
    addRole(){
        this.infos.push({
        sid: this.formFields.sid,
        givenname: this.formFields.givenname,
        surname: this.formFields.surname,
        selectedDate: this.selectedDate,
        yearlevel: this.formFields.yearlevel,
        yearenrolled: this.formFields.yearenrolled,
        courseid: this.formFields.courseid,
        status: this.formFields.status}
        )
        this.showDialog = false
    },
    openEditModal(studentData){
      this.formFields = {
        sid: studentData.sid,
        givenname:studentData.givenname,
        surname:studentData.surname,
        dob:studentData.dob,
        yearlevel:studentData.yearlevel,
        yearenrolled:studentData.yearenrolled,
        courseid:studentData.courseid
        }
        this.showDialogEdit = true
      },
      editStudent(){

          this.infos.map(student => {

            if(student.sid === this.formFields.sid){

              student.givenname = this.formFields.givenname,
              student.surname = this.formFields.surname,
              student.dob = this.formFields.dob,
              student.yearlevel = this.formFields.yearlevel,
              student.courseid = this.formFields.courseid 
            }
          })

          this.modals.modalEdit = false
        
      },
  }
};
</script>
