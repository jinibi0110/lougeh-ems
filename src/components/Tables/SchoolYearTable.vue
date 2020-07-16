<template>
  <div class="syear">
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Add School Year</md-dialog-title>
          <md-dialog-content class="md-scrollbar">
            <form student="form">
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
            <md-button class="md-info" @click="addSchoolYear()">Add</md-button>
          </md-dialog-actions>
      </md-dialog>
      <md-button class="md-info md-raised" @click="showDialog = true">Add</md-button>
    </div>
    <div id="data">
      <br>
      <md-table v-model="schoolyear" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="School Year">{{ item.sy }}</md-table-cell>
          <md-table-cell md-label="Semester">{{ item.semester }}</md-table-cell>
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
  name: "schoolYear-table",
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
        sy: null,
        semester: null,
        status: "Active"
      },
      schoolyear: [
        {
          sy: "2019-2020",
          semester: 1,
          status: "Active"
        },
        {
          sy: "2018-2019",
          semester: 2,
          status: "Not Active"
        }
      ]
    }
  },
  methods:{
    addSchoolYear(){
      this.schoolyear.push(
        {
          sy: this.formFields.sy,
          semester: this.formFields.semester,
          status: this.formFields.status
        }
      )
      this.showDialog = false
    },
  }
}
</script>
