<template>
  <div class="enroll">
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Enroll Subject</md-dialog-title>
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
                  placeholder="Subject ID"
                  id="subjectid"
                  v-model="formFields.subjectid">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="Subject Description"
                  id="subjectdesc"
                  v-model="formFields.subjectdesc">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="Section ID"
                  id="sectionid" 
                  v-model="formFields.sectionid">
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
            <md-button class="md-info" @click="addSubject()">Add</md-button>
          </md-dialog-actions>
      </md-dialog>
      <md-button class="md-info md-raised" @click="showDialog = true">Add</md-button>
    </div>
    <div id="data">
      <br>
      <md-table v-model="subjects" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Student ID">{{ item.sid }}</md-table-cell>
          <md-table-cell md-label="Subject Code">{{ item.subjectid }}</md-table-cell>
          <md-table-cell md-label="Subject Description">{{ item.subjectdesc }}</md-table-cell>
          <md-table-cell md-label="Section ID">{{ item.sectionid }}</md-table-cell>
          <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "enrollSubject-table",
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
        subjectid: null,
        subjectdesc: null,
        creditpoints: null,
        status: "Active"
      },
      subjects: [
        {
          sid: "2019-0010",
          subjectid: "IT111",
          subjectdesc: "Digital Techniques and Fundamentals",
          sectionid: "A",
          status: "Active"
        },
        {
          sid: "2019-0044",
          subjectid: "BIO101",
          subjectdesc: "Basic Biology",
          sectionid: "F",
          status: "Active"
        }
      ]
    }
  },
  methods:{
    addSubject(){
      this.subjects.push(
        {
          sid: this.formFields.sid,
          subjectid: this.formFields.subjectid,
          subjectdesc: this.formFields.subjectdesc,
          sectionid: this.formFields.sectionid,
          status: this.formFields.status
        }
      )
      this.showDialog = false
    },
  }
}
</script>
