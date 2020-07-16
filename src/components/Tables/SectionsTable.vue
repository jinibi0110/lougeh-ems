<template>
  <div class="section">
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Add Section</md-dialog-title>
          <md-dialog-content class="md-scrollbar">
            <form student="form">
              <md-field>
                <md-input alternative
                  placeholder="Section"
                  id="section" 
                  v-model="formFields.sectionid">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="Subject Code"
                  id="subjectid" 
                  v-model="formFields.subjectid">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="School Year"
                  id="sy"
                  v-model="formFields.sy">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="Semester"
                  id="Semester"
                  v-model="formFields.semester">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="Semester"
                  id="semester"
                  v-model="formFields.semester">
                </md-input>
              </md-field>
              <md-field>
                <md-input alternative
                  placeholder="Class Size"
                  id="classsize"
                  v-model="formFields.classsize">
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
            <md-button class="md-info" @click="addSection()">Add</md-button>
          </md-dialog-actions>
      </md-dialog>
      <md-button class="md-info md-raised" @click="showDialog = true">Add</md-button>
    </div>
    <div id="data">
      <br>
      <md-table v-model="sections" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Section">{{ item.sectionid }}</md-table-cell>
          <md-table-cell md-label="Subject Code">{{ item.subjectid }}</md-table-cell>
          <md-table-cell md-label="School Year">{{ item.sy }}</md-table-cell>
          <md-table-cell md-label="Semester">{{ item.semester }}</md-table-cell>
          <md-table-cell md-label="Class Size">{{ item.classsize }}</md-table-cell>
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
  name: "sections-table",
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
        sectionid: null,
        subjectid: null,
        sy: null,
        semester: null,
        classsize: null,
        status: "Active"
      },
      sections: [
        {
          sectionid: "A",
          subjectid: "IT111",
          sy: "2019-2020",
          semester: 1,
          classsize: 50,
          status: "Active"
        },
        {
          sectionid: "B",
          subjectid: "IT191",
          sy: "2019-2020",
          semester: 2,
          classsize: 25,
          status: "Active"
        }
      ]
    }
  },
  methods:{
    addSection(){
      this.sections.push(
        {
          sectionid: this.formFields.sectionid,
          subjectid: this.formFields.subjectid,
          sy: this.formFields.sy,
          semester: this.formFields.semester,
          classsize: this.formFields.classsize,
          status: this.formFields.status
        }
      )
      this.showDialog = false
    },
  }
}
</script>
