<template>
<b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('modal.right-modal')">
            <b-button v-b-modal.modalright variant="outline-primary">{{ $t('modal.launch-right-modal') }}</b-button>
            <b-modal id="modalbasic" ref="modalright" :title="$t('modal.modal-title')" modal-class="modal-right">
                {{payers}}
                <template slot="modal-footer">
                    <b-button variant="primary" @click="somethingModal('modalright')" class="mr-1">Do Something</b-button>
                    <b-button variant="secondary" @click="hideModal('modalright')">Cancel</b-button>
                </template>
            </b-modal>
        </b-card>
    </b-colxx>
<b-row>
</template>